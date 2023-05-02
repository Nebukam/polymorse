'use strict';

const nkm = require(`@nkmjs/core`);
const dom = nkm.ui.dom;
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity-block`);
class UserHeader extends base {
    constructor() { super(); }

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:user-header`,
        [nkm.com.IDS.ICON]: `document`
    };

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.CLEARANCE]: { value: 0 }
    });

    _Init() {
        super._Init();
    }

}

module.exports = UserHeader;