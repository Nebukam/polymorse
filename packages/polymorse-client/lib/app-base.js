'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);

const JSONS = nkm.data.s11n.JSONSerializer;

const views = require(`./views`);
const editors = require(`./editors`);

class AppBase extends nkm.app.AppBase {
    constructor() { super(); }

    static __singleViewLayer = require("./main-layout");

    _Init() {
        super._Init();

        this._baseURL = `http://localhost:8080`;

        this._mainCatalog = nkm.data.catalogs.CreateFrom({
            [nkm.com.IDS.NAME]: `polymorse-client-views`
        }, [
            {
                [nkm.com.IDS.NAME]: `compose`,
                [nkm.ui.IDS.VIEW_CLASS]: editors.entity.Editor
            },
            {
                [nkm.com.IDS.NAME]: `profile`,
                [nkm.ui.IDS.VIEW_CLASS]: views.Profile
            },
            {
                [nkm.com.IDS.NAME]: `drafts`,
                [nkm.ui.IDS.VIEW_CLASS]: views.Drafts
            },
            {
                [nkm.com.IDS.NAME]: `pages`,
                [nkm.ui.IDS.VIEW_CLASS]: views.Pages
            },
            {
                [nkm.com.IDS.NAME]: `admin`,
                [nkm.ui.IDS.VIEW_CLASS]: views.Admin
            }
        ]);

        this._currentUser = null;

    }

    get baseURL() { return this._baseURL; }

    get currentUser() { return this._currentUser; }

    AppReady() {
        super.AppReady();
        //TODO: Load current user profile
        nkm.env.routing.Send(polyCore.api.ops.getCurrentUser, null,
            (p_data) => {
                this._currentUser = JSONS.Deserialize(p_data);
                polyCore.PolyMorse.userRegistry._Register(this._currentUser);
            },
            (p_err) => {
                console.log(`Current user error`);
                console.log(p_err);
            }
        );
    }

    _IsReadyForDisplay() { return this._currentUser ? true : false; }

    AppDisplay() {
        this._mainLayer.header.data = this._currentUser;
        super.AppDisplay();

    }

}

module.exports = AppBase;