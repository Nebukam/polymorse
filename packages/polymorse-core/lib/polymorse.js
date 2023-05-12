'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);
const CONTEXT = require(`./context`);
const _registration = Symbol(`discover`);

class Polymorse extends nkm.com.Observable {
    constructor() { super(); }

    static get REGISTRATION() { return _registration; }

    _Init() {

        super._Init();

        this._registries = new nkm.collections.List();

        this._settings = this._NewRegistry(CONTEXT.ENTITY_SETTINGS);
        this._users = this._NewRegistry(CONTEXT.ENTITY_USER);
        this._pages = this._NewRegistry(CONTEXT.ENTITY_PAGE);

        this._mainSettings = this._settings.Create(`main`);
        let locales = this._mainSettings.CreateBlock(`locales`, polyData.blocks.JSON);
        locales.list = [`en`, `fr`, `ja`];

    }

    get registries() { return this._registries; }
    get mainSettings() { return this._mainSettings; }

    _NewRegistry(p_entityClass) {
        let newRegistry = new polyData.Registry(p_entityClass);
        this._registries.Add(newRegistry);
        return newRegistry;
    }

    get locales() { return this._locales; }

    get settingsRegistry() { return this._settings; }
    get userRegistry() { return this._users; }
    get pageRegistry() { return this._pages; }


    GetUserByAuthID(p_userInfos) {
        //TODO: Implement identity management instead of using 'sub' as uuid
        if (!p_userInfos) { return null; }
        return this._users.Get(p_userInfos.sub);
    }

    GetOrCreateUserByAuthID(p_userInfos) {
        let user = this.GetUserByAuthID(p_userInfos);
        if (!user) { user = this._users.Create(p_userInfos.sub, { userInfos: p_userInfos }); }
        return user;
    }

}

module.exports = new Polymorse();