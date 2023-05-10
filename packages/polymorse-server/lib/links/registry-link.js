'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

class RegistryLink extends nkm.com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._entityCreated = 0;

        this._registry = null;
        this._registryObserver = new nkm.com.signals.Observer();
        this._registryObserver
            .Hook(polyCore.SIGNAL.ENTITY_CREATED, this._OnEntityCreated, this);

    }

    get transceiver() { return this._transceiver; }
    set transceiver(p_value) { this._transceiver = p_value; }

    get registry() { return this._registry; }
    set registry(p_value) {
        this._registry = p_value;
        this._registryObserver.ObserveOnly(p_value);
    }

    _OnEntityCreated(p_entity) {
        this._entityCreated++;
        //
    }

    LoadHeaders() {
        this._entityCount = 0;
        //Check if user directory exists at all
        this._transceiver.Exists(``, (p_err, p_path, p_exists) => {

            if (!p_exists) {
                console.log(`Skip loading (ENOENT) :: ${p_path}`);
                this._OnHeadersLoaded();
                return;
            }

            this._transceiver.ReadDir(``, (p_err, p_path, p_content) => {

                if (p_err) {
                    if (p_err.code == 'ENOENT') {
                        //TODO: Should we create an empty directory?
                        //rely on recursive paths creation instead?
                        console.log(`Skip loading (ENOENT) :: ${p_path}`);
                        this._OnHeadersLoaded();
                    } else {
                        throw p_err;
                    }
                } else {

                    if (p_content.directories.length == 0) {
                        console.log(`Skip loading (EMPTY) :: ${p_path}`);
                        this._OnHeadersLoaded();
                        return;
                    }

                    let
                        dirs = p_content.directories,
                        total = dirs.length,
                        current = 0;

                    console.log(`Loading (${total}) :: ${p_path}`);

                    dirs.forEach(entry => {
                        this._transceiver.ReadFile(this._transceiver.Join(entry, `header.json`),
                            (p_err, p_path, headerContent) => {
                                if (headerContent) {
                                    this._registry.Create(entry, {
                                        header: nkm.u.isString(headerContent) ? JSON.parse(headerContent) : headerContent
                                    });
                                }
                                current++;
                                if (current == total) { this._OnHeadersLoaded(); }
                            });
                    });
                }
            });

        });


    }

    _OnHeadersLoaded() {
        this.Broadcast(nkm.com.SIGNAL.READY, this);
    }

}

module.exports = RegistryLink;