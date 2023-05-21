'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);

const base = require("./abstract-block");
class MediaBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-media`,
        view:'media'
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.DESCRIPTION]: { value: ``, [FLAGS.LOCALIZABLE]: true }
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.SIMPLEX.Export(MediaBlock);