'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);
const blocks = require(`./blocks`);

const base = require(`./abstract-header`);
class ContentHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:content-header`,
    }, base);

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = ContentHeader;