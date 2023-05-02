'use strict';

const nkm = require(`@nkmjs/core`);
const dom = nkm.ui.dom;
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);
const AbstractData = require("../abstract-data");

const base = AbstractData;
class ContentBlock extends base {
    constructor() { super(); }

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:block`,
        [nkm.com.IDS.ICON]: `document`
    };

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.ORDER]: { value: 0 },
        [IDS.CONTENT]: { value: `` }
    });

    _Init() {
        super._Init();
    }

}

module.exports = ContentBlock;