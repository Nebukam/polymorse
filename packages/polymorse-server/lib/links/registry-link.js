'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

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

    _OnEntityCreated(p_entity) {

    }

    _OnLoadRequest(p_registry, p_block, p_callback) {
        let nfos = nkm.com.NFOS.Get(p_block);
        this._transceiver.ReadFile(
            this._transceiver.Join(p_block.entity.uuid, `${nfos[nkm.com.IDS.TYPE]}.json`),
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
            this._transceiver.Join(p_block.entity.uuid, `${nfos[nkm.com.IDS.TYPE]}.json`),
            p_block.Serialize(),
            (p_err, p_path, p_success) => {
                if (p_err) { p_callback(p_err); }
                else { p_callback(null); }
            });
    }

    //#region Initial loading

    LoadHeaders() {

        //Check if user directory exists at all

        this._transceiver.Exists(``, (p_err, p_path, p_exists) => {

            if (!p_exists) {
                console.log(` · · ← RegistryLink :: Skip loading (ENOENT) :: ${p_path}`);
                this._OnHeadersLoaded();
                return;
            }

            this._transceiver.ReadDir(``, (p_err, p_path, p_content) => {

                if (p_err) {
                    if (p_err.code == 'ENOENT') {
                        //TODO: Should we create an empty directory?
                        //rely on recursive paths creation instead?
                        console.log(` · · ← RegistryLink :: Skip loading (ENOENT) :: ${p_path}`);
                        this._OnHeadersLoaded();
                    } else {
                        throw p_err;
                    }
                } else {

                    if (p_content.directories.length == 0) {
                        console.log(` · · ← RegistryLink :: Skip loading (EMPTY) :: ${p_path}`);
                        this._OnHeadersLoaded();
                        return;
                    }

                    let
                        dirs = p_content.directories,
                        queue = [...dirs];

                    console.log(` · · ← RegistryLink :: Loading (${total}) :: ${p_path}`);

                    dirs.forEach(entry => {
                        this._transceiver.ReadFile(
                            this._transceiver.Join(entry, `header.json`),
                            (p_err, p_path, headerContent) => {

                                //Attempt to load body
                                this._transceiver.ReadFile(
                                    this._transceiver.Join(entry, `body.json`),
                                    (p_err, p_path, bodyContent) => {

                                        let data = {};

                                        if (headerContent) {
                                            data.header = nkm.u.isString(headerContent) ?
                                                JSON.parse(headerContent) : headerContent;
                                        }

                                        if (bodyContent) {
                                            data.body = nkm.u.isString(bodyContent) ?
                                                JSON.parse(bodyContent) : bodyContent;
                                        }

                                        this._registry.Create(entry, data);

                                        queue.splice(queue.indexOf(entry), 1);
                                        if (!queue.length) { this._OnHeadersLoaded(); }

                                    });

                            });
                    });
                }
            });

        });


    }

    _OnHeadersLoaded() {
        this.Broadcast(nkm.com.SIGNAL.READY, this);
    }

    //#endregion

}

module.exports = RegistryLink;