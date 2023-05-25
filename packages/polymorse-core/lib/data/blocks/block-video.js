'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`../ids`);

const base = require("./block-media");
class VideoBlock extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:block-video`,
        view:'video'
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        
    });

    _Init() {
        super._Init();
    }

}

module.exports = nkm.data.Register(VideoBlock);