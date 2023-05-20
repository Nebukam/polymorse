'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);
const AbstractData = require("../abstract-data");

const base = AbstractData;
class ContentBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block`
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.ORDER]: { value: 0 },
        [IDS.CONTENT]: { value: `` }
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(ContentBlock);