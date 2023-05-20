'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const { RateLimiter } = require(`limiter`);

const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);

class RegistryLink extends nkm.com.Observable {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext()
        .To(`preload`, null, []);

    _Init() {
        super._Init();

        this._safeIncrement = 0;
        this._lastTimestamp = Date.now();
        this._preloadQueue = [];

        this._Bind(this._Preload);

        this._registry = null;
        this._registryObserver = new nkm.com.signals.Observer();
        this._registryObserver
            .Hook(polyCore.SIGNAL.ENTITY_CREATED, this._OnEntityCreated, this)
            .Hook(polyCore.SIGNAL.REQUEST_LOAD, this._OnLoadRequest, this)
            .Hook(polyCore.SIGNAL.REQUEST_SAVE, this._OnSaveRequest, this);

        this._batchCount = 10;
        this._rateLimit = new RateLimiter({ tokensPerInterval: 1500, interval: "second" });

    }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.constructor.__distribute.Update(this, p_options);
    }

    get timestampUID() {
        let ts = Date.now();
        if (ts == this._lastTimestamp) {
            this._safeIncrement++;
        } else {
            this._lastTimestamp = ts;
            this._safeIncrement = 0;
        }
        return `${this._lastTimestamp}-${this._safeIncrement.toString(16)}`;
    }

    get transceiver() { return this._transceiver; }
    set transceiver(p_value) { this._transceiver = p_value; }

    get registry() { return this._registry; }
    set registry(p_value) {
        this._registry = p_value;
        this._registryObserver.ObserveOnly(p_value);
    }

    get preload() { return this._preload; }
    set preload(p_value) {
        this._preload = p_value;
    }

    _OnEntityCreated(p_registry, p_entity) {

    }

    _OnLoadRequest(p_registry, p_block, p_callback) {
        let nfos = nkm.com.NFOS.Get(p_block);
        this._transceiver.ReadFile(
            this._transceiver.Join(p_block.parent.uuid, `${nfos[nkm.com.IDS.TYPE]}.json`),
            (p_err, p_path, p_serial) => {
                if (p_err) {
                    p_callback(p_err);
                } else {
                    p_block.Deserialize(JSON.parse(p_serial));
                    p_callback(null);
                }
                return p_block;
            });
    }

    _OnSaveRequest(p_registry, p_block, p_callback) {
        let nfos = nkm.com.NFOS.Get(p_block);
        this._transceiver.WriteFile(
            this._transceiver.Join(p_block.parent.uuid, `${nfos[nkm.com.IDS.TYPE]}.json`),
            JSON.stringify(p_block.Serialize()),
            (p_err, p_path, p_success) => {
                if (p_err) { p_callback(p_err); }
                else { p_callback(null); }
                return p_block;
            });
    }

    //#region Initial loading

    Bootstrap(p_callback) {
        let rSettings = this._registry.settings;
        if (this._preload?.length) {
            for (const p of this._preload) { this._preloadQueue.push(p); };
        }

        this._log(`Bootstrap`);

        if (rSettings) {
            rSettings.header.RequestLoad((p_block, p_err) => {
                if (p_err) {
                    rSettings.header.RequestSave((p_block, p_err) => {
                        if (p_err) { throw p_err; }
                        this._registry.InitSettings(() => { this._Preload(p_callback); }, true);
                    });
                } else { this._registry.InitSettings(() => { this._Preload(p_callback); }, false); }
            });
        } else {
            this._Preload(p_callback);
        }
    }

    _Preload(p_callback) {

        let blocId = this._preloadQueue.pop();

        if (!blocId) {
            p_callback();
            return;
        }

        this.TryLoad(blocId, null, () => { this._Preload(p_callback); });

    }

    async TryLoad(p_blocId, p_entityIds, p_callback) {

        this._transceiver.Exists(``, (p_err, p_path, p_exists) => {

            if (!p_exists) {
                this._log(`Skip loading (ENOENT on ${p_path})`, `←`);
                p_callback(this, p_entityIds);
                return;
            }

            if (!p_entityIds) {

                this._transceiver.ReadDir(``, (p_err, p_path, p_content) => {

                    if (p_err) {
                        if (p_err.code == 'ENOENT') {
                            this._log(`Skip loading (ENOENT)`, `←`);
                            p_callback(this, p_entityIds);
                        } else {
                            throw p_err;
                        }
                    } else {
                        this._LoadBlocList(p_content.directories, p_blocId)
                            .then((ids) => { p_callback(this, p_entityIds); });
                    }

                });

            } else {
                this._LoadBlocList(p_entityIds, p_blocId).then((ids) => { p_callback(this, p_entityIds); });
            }

        });

    }

    async _LoadBlocList(p_entityIds, p_blocId) {

        if (p_entityIds.length == 0) {
            this._log(`Skip loading [@${p_blocId}] (EMPTY)`, `←`);
            resolve(p_entityIds);
            this.Broadcast(SIGNAL.BLOCS_LOADED, this, p_entityIds, p_blocId);
            return;
        }

        let queue = [...p_entityIds];

        this._log(`Loading [@${p_blocId}]  (${queue.length})`, `←`);

        while (queue.length) {

            let batch = [];

            for (let i = 0; i < this._batchCount; i++) {
                let eid = queue.shift();
                if (!eid) { continue; }
                batch.push(this.LoadBloc(eid, p_blocId));
            }

            await this._rateLimit.removeTokens(batch.length);
            await Promise.all(batch);

        }

        this.Broadcast(SIGNAL.BLOCS_LOADED, this, p_entityIds, p_blocId);
        return p_entityIds;

    }

    //#region 

    //#region Loading data

    async LoadBloc(p_entityId, p_blocId) {
        return this._transceiver.ReadFile(
            this._transceiver.Join(p_entityId, `${p_blocId}.json`),
            (p_err, p_path, p_data) => {
                let data = { [p_blocId]: nkm.u.isString(p_data) ? JSON.parse(p_data) : p_data };
                nkm.data.SIMPLEX.GetBloc(this._registry.GetOrCreate(p_entityId, data), p_blocId);
            });
    }

    async RequireEntity(p_entityId) {

        let
            blocDefs = this._registry.entityClass.__BLOCS,
            entity = this._registry.Get(p_entityId),
            ids = [],
            promises = [],
            serials = {};

        console.log(`RequireEntity`, p_entityId, entity ? true : false);

        let loaded = true;

        for (let id in blocDefs) {
            let def = blocDefs[id];
            if (!entity || !entity[def.member].isLoaded) {
                loaded = false;
                ids.push(id);
                promises.push(this._transceiver.ReadFile(
                    this._transceiver.Join(p_entityId, `${id}.json`),
                    (p_err, p_path, p_data) => {
                        if (p_err) { return null; }
                        return nkm.u.isString(p_data) ? JSON.parse(p_data) : p_data;
                    })
                );
            }
        }

        console.log(`bloc ids to be loaded: `, ids);

        if (loaded) { return entity; }

        let
            data = await Promise.all(promises),
            i = 0;

        for (const d of data) {
            if (d != null) { serials[ids[i]] = d; }
            i++;
        }

        return Object.keys(serials).length ? this._registry.GetOrCreate(p_entityId, serials) : null;

    }

    //#endregion

    //#region Saving data

    async SaveBloc(p_entityId, p_blocId) {

        let bloc = nkm.data.SIMPLEX.GetBloc(this._registry.Get(p_entityId), p_blocId);
        if (!bloc) { return null; }

        return this._transceiver.WriteFile(
            this._transceiver.Join(p_entityId, `${p_blocId}.json`),
            bloc.Serialize(),
            (p_err, p_path, p_success) => { return bloc; });
    }

    async SaveEntity(p_entityId) {

    }

    //#endregion

    _log(p_message, p_icon = '←') { //ⓘ ← →
        console.log(` · · ${p_icon} RegistryLink(${this._registry?.name}) | ${nkm.u.tils.TruncateStart(this._transceiver.root, 30)} :: ${p_message}`);
    }

}

module.exports = RegistryLink;