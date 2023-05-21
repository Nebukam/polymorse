'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const JSONS = nkm.data.s11n.JSONSerializer;

const LOCALES = require(`../locales`);
const SIGNAL = require(`../signal`);
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

        this._mirrors = {};
        this._locale = LOCALES.raw;
    }

    get uuid() { return this._raw ? this._raw.uuid : this.Get(IDS.UUID); }
    set uuid(p_value) { this.Set(IDS.UUID, p_value); }

    get infos() { return this._infos; }

    get isLoaded() { return this._isLoaded; }
    set isLoaded(p_value) {
        if (this._isLoaded == p_value) { return; }
        this._isLoaded = p_value;
        if (this._isLoaded) { this.Broadcast(SIGNAL.LOADED, this); }
    }

    //#region Localized mirrors

    get locale() { return this._locale; }
    set locale(p_value) { this._locale = p_value; }

    get raw() { return this._raw; }
    set raw(p_value) {

        if (this._raw == p_value) { return; }

        let oldRaw = this._raw;
        this._raw = p_value;

        if (oldRaw) {
            delete oldRaw._mirrors[this._locale];
        }

        if (this._raw) {
            this._raw._mirrors[this._locale] = this;
        }

    }

    GetLocale(p_locale) {
        return this._mirrors[p_locale];
    }

    GetOrCreateLocale(p_locale) {

        let mirror = this._mirrors[p_locale];

        if (!mirror) {
            mirror = nkm.com.Rent(this.constructor);
            mirror.locale = p_locale;
            mirror.raw = this;
        }

        return mirror;

    }

    //#endregion

    _CleanUp() {
        this.raw = null;
        super._CleanUp();
        this.isLoaded = false;
        this._infos = null;
    }

    Deserialize(p_serial, p_options) {
        JSONS.Deserialize(p_serial, this, p_options);
        this.isLoaded = true;
    }

    Serialize(p_options) { return JSONS.Serialize(this, p_options); }

    toString() { return `{${this.constructor.name}::...}`; }

}

module.exports = AbstractData;