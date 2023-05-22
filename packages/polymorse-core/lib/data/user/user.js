'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);
const CTX = require(`../../context`);

const base = require(`../abstract-entity`);
class User extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user`
    }, base);

    static __BLOCS = base.Ext(base.__BLOCS, {
        [IDS.BLOC_HEADER]: { type: CTX.USER_BLOC_HEADER },
        [IDS.BLOC_BODY]: { type: CTX.USER_BLOC_BODY },
        [IDS.BLOC_INVENTORY]: { type: CTX.USER_BLOC_BODY },
    });

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = nkm.data.SIMPLEX.Export(User);