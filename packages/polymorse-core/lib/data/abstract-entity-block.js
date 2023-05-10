'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const AbstractData = require("./abstract-data");

/**
 * A Morse file contains the raw user input
 * 
 * 
 */

const base = AbstractData;
class AbstractEntityBlock extends base {
    constructor() { super(); }

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:entity-block`,
        [nkm.com.IDS.ICON]: `document`
    };

    _Init() {
        super._Init();
        this._entity = null;
    }

    get entity() { return this._entity; }
    set entity(p_value) { this._entity = p_value; }

    _CleanUp() {
        this.entity = null;
        super._CleanUp();
    }


}

module.exports = AbstractEntityBlock;