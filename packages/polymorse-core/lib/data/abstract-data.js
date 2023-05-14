'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const JSONS = nkm.data.serialization.JSONSerializer;

const IDS = require(`./ids`);

const base = nkm.data.SimpleDataBlock;
class AbstractData extends base {
    constructor() { super(); }

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:abstract-body`
    };

    static __VALUES = {
        [IDS.UUID]: { value: `` },
    };

    _Init() {
        super._Init();
        this._infos = null;
    }

    get uuid() { return this.Get(IDS.UUID); }
    set uuid(p_value) { this.Set(IDS.UUID, p_value); }

    get infos() { return this._infos; }

    _CleanUp() {
        super._CleanUp();
        this._infos = null;
    }

    Deserialize(p_serial) { JSONS.Deserialize(p_serial, this); }

    Serialize() { return JSONS.Serialize(this); }

    toString() { return `{${this.constructor.name}::...}`; }

}

module.exports = AbstractData;