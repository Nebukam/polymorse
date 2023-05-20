'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./content-header`);
class UserHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user-header`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.CLEARANCE]: { value: 0 },
        [IDS.IDENTITY]: { value: [] }
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(UserHeader);