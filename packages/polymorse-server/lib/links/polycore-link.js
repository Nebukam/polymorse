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
        this._regLinkObserver.Hook(nkm.com.SIGNAL.READY, this._ProcessNext, this);

        this._regLinks = [];
        this._regQueue = [];

        this._rootSettings = PolyMorse.settingsRegistry.Create(`root`);

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

        this._settingsLink = this._RegistryLink(
            PolyMorse.settingsRegistry,
            p_config.settings);

        this._usersLink = this._RegistryLink(
            PolyMorse.userRegistry,
            p_config.users);

        this._pagesLink = this._RegistryLink(
            PolyMorse.pageRegistry,
            p_config.pages);

        let sts = this._settingsLink.transceiver;

        // Check if content is available
        sts.ReadFile(sts.Join(`root.json`),
            (p_err, p_path, p_content) => {
                if (p_err) {
                    console.log(`Root settings not found, creating them.`);
                    // Need to create root settings first.
                    let serial = JSON.stringify(this._rootSettings.Serialize());
                    this._settingsLink.transceiver.WriteFile(`${this._rootSettings.uuid}.json`, serial,
                        (p_err, p_path, p_success) => {
                            if (p_err) { console.log(p_err); }
                            else { this._ProcessNext(); }
                        });
                } else {
                    console.log(`Root settings found, processing.`);
                    // Root settings can be pushed.
                    this._rootSettings.Deserialize(JSON.parse(p_content));
                    //TODO: Do something with options...
                    this._ProcessNext();
                }
            }
        );

    }

    _ProcessNext() {

        let currentLink = this._regQueue.shift();
        console.log(`_ProcessNext`);

        if (!currentLink) {
            this._OnInitializationEnd();
            return;
        }

        currentLink.LoadHeaders();

    }

    _OnInitializationEnd() {
        this._initializing = false;
        this._ready = true;
        this.Broadcast(nkm.com.SIGNAL.READY, this);
    }

}

module.exports = new PolyCoreLink();