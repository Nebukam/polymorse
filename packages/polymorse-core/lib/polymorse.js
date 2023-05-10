'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);
const _registration = Symbol(`discover`);

class Polymorse extends nkm.com.Observable {
    constructor() { super(); }

    static get REGISTRATION() { return _registration; }

    _Init() {

        super._Init();

        this._registries = new nkm.collections.List();

        this._settings = this._NewRegistry(polyData.Settings);
        this._users = this._NewRegistry(polyData.User);
        this._pages = this._NewRegistry(polyData.Page);

        this._locales = [`en`, `fr`, `ja`];

    }

    get registries() { return this._registries; }

    _NewRegistry(p_entityClass) {
        let newRegistry = new polyData.Registry(p_entityClass);
        this._registries.Add(newRegistry);
        return newRegistry;
    }

    get locales() { return this._locales; }

    get userRegistry() { return this._users; }
    get pageRegistry() { return this._pages; }
    get settingsRegistry() { return this._settings; }

    GetUserByAuthID(p_userInfos) {
        //TODO: Implement identity management instead of using 'sub' as uuid
        if (!p_userInfos) { return null; }
        return this._users.Get(p_userInfos.sub);
    }

    GetOrCreateUserByAuthID(p_userInfos) {
        let user = this.GetUserByAuthID(p_userInfos);
        if (!user) { user = this._users.Create(uid, { userInfos: p_userInfos }); }
        return user;
    }

}

module.exports = new Polymorse();