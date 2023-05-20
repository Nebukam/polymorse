'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);

const base = require(`./content-header`);
class EntityStats extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:entity-stats`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {

    });

    _Init(){
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = EntityStats;
nkm.com.BINDINGS.RegisterFromNFO(EntityStats);