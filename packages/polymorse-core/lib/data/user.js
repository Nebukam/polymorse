'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity`);
class User extends base {
    constructor() { super(); }

    static __headerClass = require(`./user-header`);
    static __bodyClass = require(`./user-body`);

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:user`,
        [nkm.com.IDS.ICON]: `document`
    };

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = User;