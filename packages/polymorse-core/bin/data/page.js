'use strict';

const nkm = require(`@nkmjs/core`);
const dom = nkm.ui.dom;
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity`);
class Page extends base {
    constructor() { super(); }

    static __headerClass = require(`./page-header`);
    static __bodyClass = require(`./page-body`);

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:page`,
        [nkm.com.IDS.ICON]: `document`
    };

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = Page;