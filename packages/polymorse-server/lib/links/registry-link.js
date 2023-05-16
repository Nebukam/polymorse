'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const SIGNAL = require(`../signal`);

class RegistryLink extends nkm.com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._registry = null;
        this._registryObserver = new nkm.com.signals.Observer();
        this._registryObserver
            .Hook(polyCore.SIGNAL.ENTITY_CREATED, this._OnEntityCreated, this)
            .Hook(polyCore.SIGNAL.REQUEST_LOAD, this._OnLoadRequest, this)
            .Hook(polyCore.SIGNAL.REQUEST_SAVE, this._OnSaveRequest, this);

    }

    get transceiver() { return this._transceiver; }
    set transceiver(p_value) { this._transceiver = p_value; }

    get registry() { return this._registry; }
    set registry(p_value) {
        this._registry = p_value;
        this._registryObserver.ObserveOnly(p_value);
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
            });
    }

    //#region Initial loading

    _LoadIDList(p_ids, p_type) {
        return new Promise(resolve => {

            if (p_ids.length == 0) {
                this._log(`Skip loading [@${p_type}] (EMPTY)`, `←`);
                resolve(p_ids);
                return;
            }

            let queue = [...p_ids];

            this._log(`Loading [@${p_type}]  (${queue.length})`, `←`);

            p_ids.forEach(entry => {

                this._transceiver.ReadFile(
                    this._transceiver.Join(entry, `${p_type}.json`),
                    (p_err, p_path, p_data) => {

                        let data = { [p_type]: nkm.u.isString(p_data) ? JSON.parse(p_data) : p_data };

                        this._registry.GetOrCreate(entry, data);

                        queue.splice(queue.indexOf(entry), 1);
                        if (!queue.length) { resolve(p_ids); }

                    });

            });

        });
    }

    TryLoad(p_type, p_ids, p_callback) {

        //Check if user directory exists at all
        let type = polyCore.data.IDS.TYPE_HEADER;

        this._transceiver.Exists(``, (p_err, p_path, p_exists) => {

            if (!p_exists) {
                this._log(`Skip loading (ENOENT on ${p_path})`, `←`);
                p_callback(this, p_ids);
                return;
            }

            if (!p_ids) {

                this._transceiver.ReadDir(``, (p_err, p_path, p_content) => {

                    if (p_err) {
                        if (p_err.code == 'ENOENT') {
                            this._log(`Skip loading (ENOENT)`, `←`);
                            p_callback(this, p_ids);
                        } else {
                            throw p_err;
                        }
                    } else {
                        this._LoadIDList(p_content.directories, p_type)
                            .then((ids) => { p_callback(this, p_ids); });
                    }

                });

            } else {
                this._LoadIDList(p_ids, p_type).then((ids) => { p_callback(this, p_ids); });
            }

        });

    }

    Bootstrap(p_callback) {
        let rSettings = this._registry.settings;
        if (rSettings) {
            rSettings.header.RequestLoad((p_block, p_err) => {
                if (p_err) {
                    rSettings.header.RequestSave((p_block, p_err) => {
                        if (p_err) { throw p_err; }
                        this._registry.InitSettings(() => { this.LoadHeaders(null, p_callback); }, true);
                    });
                } else { this._registry.InitSettings(() => { this.LoadHeaders(null, p_callback); }, false); }
            });
        } else {
            this.LoadHeaders(null, p_callback);
        }
    }

    LoadHeaders(p_ids = null, p_callback = null) {
        this.TryLoad(polyCore.data.IDS.TYPE_HEADER, p_ids,
            (p_source, p_fwdIds) => {
                this._OnHeadersLoaded(p_ids, p_callback);
            });
    }

    _OnHeadersLoaded(p_ids, p_callback = null) {
        if (p_callback) { p_callback(this, p_ids); }
        this.Broadcast(SIGNAL.HEADERS_LOADED, this, p_ids);
    }

    LoadBodies(p_ids = null, p_callback = null) {
        this.TryLoad(polyCore.data.IDS.TYPE_BODY, p_ids,
            (p_source, p_fwdIds) => {
                this._OnBodiesLoaded(p_ids, p_callback);
            });
    }

    _OnBodiesLoaded(p_ids, p_callback = null) {
        if (p_callback) { p_callback(this, p_ids); }
        this.Broadcast(SIGNAL.BODIES_LOADED, this, p_ids);
    }

    //#endregion

    _log(p_message, p_icon = '←') { //ⓘ ← →
        console.log(` · · ${p_icon} RegistryLink | ${nkm.u.tils.TruncateStart(this._transceiver.root, 30)} :: ${p_message}`);
    }

}

module.exports = RegistryLink;