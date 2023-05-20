'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);

const base = require("./abstract-block");
class EmbedBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-embed`,
        view:'embed'
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        //[IDS.CONTENT]: { value: `` }
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(EmbedBlock);