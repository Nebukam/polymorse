'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-body`);
class PageBody extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:page-body`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.TITLE]: { value: `` },
        [IDS.SUMMARY]: { value: `` },
    });

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = PageBody;
nkm.com.BINDINGS.RegisterFromNFO(PageBody);