'use strict';

const nkm = require(`@nkmjs/core`);
const IDS = require(`./ids`);

const base = nkm.data.SimpleDataBlock;
class AbstractData extends base {

    constructor() { super(); }

    static __VALUES = {
        [IDS.UUID]: { value: `` },
    };

    _Init() {
        super._Init();
        this._infos = null;
    }

    get infos() { return this._infos; }

    _CleanUp(){
        super._CleanUp();
        this._infos = null;
    }


    toString() { return `{${this.constructor.name}::${this.rootId}}`; }

}

module.exports = AbstractData;