'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);

const MainLayout = require("./main-layout");
const views = require(`./views`);
const editors = require(`./editors`);

class AppBase extends nkm.app.AppBase {
    constructor() { super(); }

    static __singleViewLayer = MainLayout;

    get baseURL() { return this._baseURL; }

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

    AppReady() {
        super.AppReady();
        //TODO: Load current user profile
        nkm.env.routing.Send(polyCore.api.ops.getCurrentUser, null,
            (p_data) => {
                console.log(`Current user loaded`);
                console.log(p_data);
            },
            (p_err) => {
                console.log(`Current user error`);
                console.log(p_err);
            }
        );
    }

    _IsReadyForDisplay() { return this._currentUser ? true : false; }

    AppDisplay() {

        super.AppDisplay();

    }

}

module.exports = AppBase;