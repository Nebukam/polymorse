'use strict';

const nkm = require(`@nkmjs/core`);
const dom = nkm.ui.dom;
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const AbstractData = require("./abstract-data");
const MorseHeader = require(`./page-header`);

const _id_HEADER = Object.freeze('header');
const _id_BODY = Object.freeze('body');

const base = AbstractData;
class AbstractEntity extends base {
    constructor() { super(); }

    static __headerClass = null;
    static __bodyClass = null;

    static __NFO__ = {
        [nkm.com.IDS.UID]: `@polymorse:entity`,
        [nkm.com.IDS.ICON]: `document`
    };

    _Init() {
        super._Init();
        this._uuid = ``;
        this._header = null;
        this._body = null;
    }

    get uuid() { return this._uuid; }
    set uuid(p_value) { this._uuid = p_value; }

    get header() { return this._header; }
    set header(p_value) {
        if (this._AssignBlock(_id_HEADER, p_value)) {

        }
    }

    get body() { return this._body; }
    set body(p_value) {
        if (this._AssignBlock(_id_BODY, p_value)) {

        }
    }

    _AssignBlock(p_id, p_value = null) {

        if (this[p_id] == p_value) { return null; }
        let oldBlock = this[p_id];
        this[p_id] = null;

        if (oldBlock) {
            oldBlock.entity = null;
            oldBlock.Release();
        }
        if (p_value) {
            this[p_id] = p_value;
            p_value.entity = this;
            return p_value;
        }
    }

    LoadHeader() { }

    LoadBody() { }

    _CleanUp() {
        this.header = null;
        super._CleanUp();
    }


}

module.exports = AbstractEntity;