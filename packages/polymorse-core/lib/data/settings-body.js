'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-body`);
class SettingsBody extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:settings-body`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        //[IDS.CLEARANCE]: { value: 0 }
    });

    _Init() {
        super._Init();
    }

}

module.exports = SettingsBody;
nkm.com.BINDINGS.RegisterFromNFO(SettingsBody);