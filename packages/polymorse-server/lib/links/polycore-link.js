'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const RegistryLink = require("./registry-link");

const PolyMorse = polyCore.PolyMorse;

class PolyCoreLink extends nkm.com.Observable {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._initializing = false;

        this._ready = false;
        this._config = null;

        this._regLinkObserver = new nkm.com.signals.Observer();

        this._regLinks = [];
        this._regQueue = [];

        this._Bind(this._ProcessNext);

    }

    _RegistryLink(p_registry, p_transceiver) {

        let newRegLink = new RegistryLink();
        newRegLink.registry = p_registry;
        newRegLink.transceiver = p_transceiver;

        this._regLinks.push(newRegLink);
        this._regQueue.push(newRegLink);
        this._regLinkObserver.Observe(newRegLink);

        return newRegLink;

    }

    get ready() { return this._ready; }

    /**
     * 
     * @param {object} p_config 
     * @param {Transceiver} p_config.settings
     * @param {Transceiver} p_config.users
     * @param {Transceiver} p_config.pages
     */
    InitializeAndStart(p_config) {

        if (this._initializing) { return; }
        this._initializing = true;

        this._config = p_config;

        p_config.registries.forEach(conf => {
            let link = this._RegistryLink(conf.registry, conf.io);
        });

        PolyMorse.mainSettings.body.RequestLoad((p_block, p_err) => {
            if (p_err) {
                PolyMorse.mainSettings.body.RequestSave((p_block, p_err) => {
                    if (p_err) { throw p_err; }
                    this._ProcessNext();
                })
            } else { this._ProcessNext(); }
        });

    }

    _ProcessNext() {

        let currentLink = this._regQueue.shift();

        if (!currentLink) {
            this._OnInitializationEnd();
            return;
        }

        currentLink.LoadHeaders(null, this._ProcessNext);

    }

    _OnInitializationEnd() {
        this._initializing = false;
        this._ready = true;
        this.Broadcast(nkm.com.SIGNAL.READY, this);
    }

}

module.exports = new PolyCoreLink();