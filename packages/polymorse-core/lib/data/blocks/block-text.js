'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);
const BLOCK_IDS = require(`./ids`);
const ENUMS = require("../enums");

const base = require("./abstract-block");

class TextBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-text`
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [BLOCK_IDS.TEXT_TYPE]: { value: ENUMS.TEXT_TYPE_PLAIN }
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(TextBlock);