'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-header`);
class SettingsHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:settings-header`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        //[IDS.CLEARANCE]: { value: 0 },
    });

    _Init() {
        super._Init();
    }

}

module.exports = SettingsHeader;
nkm.com.BINDINGS.RegisterFromNFO(SettingsHeader);