'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CONTEXT = require(`../context`);

const base = require(`./abstract-entity`);
class User extends base {
    constructor() { super(); }

    static __headerKey = CONTEXT.ENTITY_USER_HEADER;
    static __bodyKey = CONTEXT.ENTITY_USER_BODY;

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user`
    }, base);

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = User;