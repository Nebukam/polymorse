'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CONTEXT = require(`../context`);

const base = require(`./abstract-entity`);
class Settings extends base {
    constructor() { super(); }

    static __headerKey = CONTEXT.ENTITY_SETTINGS_HEADER;
    static __bodyKey = CONTEXT.ENTITY_SETTINGS_BODY;

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:settings`
    }, base);

    _Init() {
        super._Init();
        this.LoadHeader();
        this.LoadBody();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = Settings;