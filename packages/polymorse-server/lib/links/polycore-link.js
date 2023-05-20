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
        this._registryMap = new Map();

        this._regLinks = [];
        this._regQueue = [];

        this._Bind(this._ProcessNext);

    }

    _RegistryLink(p_config) {

        let registry = p_config.registry,
            transceiver = p_config.io,
            newRegLink = new RegistryLink();

        newRegLink.registry = registry;
        newRegLink.transceiver = transceiver;

        newRegLink.options = p_config;

        this._registryMap.set(registry, newRegLink);

        this._regLinks.push(newRegLink);
        this._regQueue.push(newRegLink);
        this._regLinkObserver.Observe(newRegLink);

        return newRegLink;

    }

    GetRegistryLink(p_registry) { return this._registryMap.get(p_registry); }

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

        for (const conf of p_config.registries) {
            let link = this._RegistryLink(conf);
        };

        PolyMorse.mainSettings.header.RequestLoad((p_block, p_err) => {
            if (p_err) {
                nkm.main.InitMainSettings(() => {
                    PolyMorse.mainSettings.header.RequestSave((p_block, p_err) => {
                        if (p_err) { throw p_err; }
                        nkm.main.ProcessMainSettings(this._ProcessNext);
                    });
                });
            } else { nkm.main.ProcessMainSettings(this._ProcessNext); }
        });

    }

    _ProcessNext() {

        let currentLink = this._regQueue.shift();

        if (!currentLink) {
            this._OnInitializationEnd();
            return;
        }

        currentLink.Bootstrap(this._ProcessNext);

    }

    _OnInitializationEnd() {
        this._initializing = false;
        this._ready = true;
        this.Broadcast(nkm.com.SIGNAL.READY, this);
    }

}

module.exports = new PolyCoreLink();