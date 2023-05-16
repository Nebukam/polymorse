'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);
const SIGNAL = require(`./signal`);
const CONTEXT = require(`./context`);
const _registration = Symbol(`discover`);

class Polymorse extends nkm.com.Observable {
    constructor() { super(); }

    static get REGISTRATION() { return _registration; }

    _Init() {

        super._Init();

        this._serverSide = false;
        this._registries = new nkm.collections.List();

        this._settings = this._NewRegistry(`settings`, CONTEXT.ENTITY_SETTINGS);
        this._users = this._NewRegistry('users', CONTEXT.ENTITY_USER, 'users');
        this._pages = this._NewRegistry('pages', CONTEXT.ENTITY_PAGE, 'pages');
        this._drafts = this._NewRegistry('drafts', CONTEXT.ENTITY_PAGE, 'drafts');

        this._Bind(this._OnPageCreated);
        this._Bind(this._OnPageHeaderValueChanged);

        this._pages
            .Watch(SIGNAL.ENTITY_CREATED, this._OnPageCreated);
        this._pages.entitiesObserver
            .Hook(SIGNAL.HEADER_VALUE_CHANGED, this._OnPageHeaderValueChanged);

        this._drafts
            .Watch(SIGNAL.ENTITY_CREATED, this._OnPageCreated);
        this._drafts.entitiesObserver
            .Hook(SIGNAL.HEADER_VALUE_CHANGED, this._OnPageHeaderValueChanged);


        this._mainSettings = this._settings.Create(`main`);
        this._locales = this._mainSettings.GetOrSet(`locales`, [`en`, `fr`, `ja`]);
        this._registryIndices = this._mainSettings.GetOrSet(`registryIndices`, {});

    }

    get serverSide() { return this._serverSide; }

    get registries() { return this._registries; }
    get mainSettings() { return this._mainSettings; }

    _NewRegistry(p_name, p_entityClass, p_prefix) {
        let newRegistry = new polyData.Registry(p_name, p_entityClass);
        this._registries.Add(newRegistry);
        newRegistry.prefix = p_prefix;
        if (this._settings) { newRegistry.settings = this._settings.Create(p_name); }
        return newRegistry;
    }

    get locales() { return this._locales; }

    get settingsRegistry() { return this._settings; }
    get userRegistry() { return this._users; }
    get pageRegistry() { return this._pages; }
    get draftRegistry() { return this._drafts; }


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

    //#region Change handling

    _OnPageCreated(p_registry, p_page) {
        let h = p_page.header;
        if (!h) { return; }
        this._OnPageHeaderValueChanged(h, polyData.IDS.OWNER_ID, h.Get(polyData.IDS.OWNER_ID), null);
    }


    _OnUserHeaderValueChanged(p_header, p_id, p_newValue, p_oldValue) {
        switch (p_id) {
            case polyData.IDS.IDENTITY:

                break;
        }
    }

    _OnPageHeaderValueChanged(p_header, p_id, p_newValue, p_oldValue) {
        switch (p_id) {
            case polyData.IDS.OWNER_ID:
                let
                    oldOwner = this._users.Get(p_oldValue),
                    newOwner = this._users.Get(p_newValue);

                if (oldOwner) { newOwner.pages.Remove(p_header); }
                if (newOwner) { newOwner.pages.Add(p_header); }

                break;
        }
    }

    //#endregion

}

module.exports = new Polymorse();