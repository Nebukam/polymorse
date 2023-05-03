'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);

class Polymorse extends nkm.com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._users = new polyData.Registry(polyData.User);
        this._pages = new polyData.Registry(polyData.Page);
        this._locales = [`en`, `fr`, `ja`];

    }

    static get locales() { return this.instance._locales; }

    static CreateUser(p_uid) {
        let newUser = this.instance._users.Create(p_uid);
        return newUser;
    }

    static CreatePage(p_uid) {
        let newPage = this.instance._pages.Create(p_uid);
        return newPage;
    }

}

module.exports = Polymorse;