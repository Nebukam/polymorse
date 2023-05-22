'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const FLAGS = require(`../../flags`);
const IDS = require(`../ids`);

const base = require(`../abstract-header`);
class UserHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user-header`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.CLEARANCE]: { value: 0 },
        [IDS.IDENTITY]: { value: [] },
        [IDS.NAME]: { value: `Unamed`, [FLAGS.LOCALIZABLE]: true },
        [IDS.PRONOUNS]: { value: ``, [FLAGS.LOCALIZABLE]: true },
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(UserHeader);