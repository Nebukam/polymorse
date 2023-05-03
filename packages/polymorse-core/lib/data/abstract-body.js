'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity-block`);
class AbstractBody extends base {
    constructor() { super(); }

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:abstract-body`,
        [nkm.com.IDS.ICON]: `document`
    };

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

module.exports = AbstractBody;