'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);
const AbstractData = require("../abstract-data");

const base = require("./abstract-block");
class ContentBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-object`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.JSON]: { value: {} }
    });


    get json() { return this.Get(IDS.JSON); }
    set json(p_value) { this.Set(IDS.JSON, p_value); }

    _Init() {
        super._Init();
    }

}

module.exports = ContentBlock;
nkm.com.BINDINGS.RegisterFromNFO(ContentBlock);