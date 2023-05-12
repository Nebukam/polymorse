'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity-block`);
class AbstractHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:abstract-header`,
        [nkm.com.IDS.TYPE]: IDS.TYPE_HEADER
    }, base);

    static __DATALISTS = {
        [IDS.CONTENT_BLOCKS]: { autoSort: (a, b) => { return a.Get(IDS.ORDER) - b.Get(IDS.ORDER) } },
    };

    _Init() {
        super._Init();
    }

    get blocks() { return this._blocks; }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = AbstractHeader;