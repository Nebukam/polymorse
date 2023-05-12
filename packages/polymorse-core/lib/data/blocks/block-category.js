'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);

const base = require("./abstract-block");
class TextBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-category`
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.TITLE]: { value: `` },
        [IDS.DESCRIPTION]: { value: `` },
        [IDS.PARENT_UUID]: { value: null },
    });

    _Init() {
        super._Init();
    }

}

module.exports = TextBlock;
nkm.com.BINDINGS.RegisterFromNFO(TextBlock);