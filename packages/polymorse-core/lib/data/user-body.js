'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-body`);
class UserBody extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user-body`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.BOOKMARKS]: { value: [] },
        [IDS.LIKES]: { value: [] },
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(UserBody);