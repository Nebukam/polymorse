'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);

class Polymorse extends nkm.com.Observable {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._users = new polyData.Registry(polyData.User);
        this._pages = new polyData.Registry(polyData.Page);
        this._locales = [`en`, `fr`, `ja`];

    }

    get locales() { return this._locales; }

    get userRegistry() { return this._users; }
    get pageRegistry() { return this._pages; }

    CreateUser(p_uid) {
        let newUser = this._users.Create(p_uid);
        return newUser;
    }

    CreatePage(p_uid) {
        let newPage = this._pages.Create(p_uid);
        return newPage;
    }

}

module.exports = new Polymorse();