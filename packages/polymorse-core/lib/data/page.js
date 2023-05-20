'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CTX = require(`../context`);

const base = require(`./abstract-entity`);
class Page extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:page`
    }, base);

    static __BLOCS = base.Ext(base.__BLOCS, {
        [IDS.BLOC_HEADER]: { type: CTX.PAGE_BLOC_HEADER },
        [IDS.BLOC_BODY]: { type: CTX.PAGE_BLOC_BODY },
        [IDS.BLOC_STATS]: { type: CTX.ENTITY_STATS },
    });

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = Page;
nkm.com.BINDINGS.RegisterFromNFO(Page);