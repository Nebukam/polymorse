'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);
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

        this._header = null;
        this._body = null;
        this._requestCBs = new nkm.com.helpers.CallList();

        this._Bind(this._OnBodyRequestHandled);

    }

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

        p_id = `_${p_id}`;

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

    LoadHeader(p_serial = null) {
        if (!this._header) { this.header = nkm.com.Rent(this.constructor.__headerClass); }
        if (p_serial) { this._header.Deserialize(p_serial); }
        return this._header;
    }

    LoadBody(p_serial = null) {
        if (!this._body) { this.body = nkm.com.Rent(this.constructor.__bodyClass); }
        if (p_serial) { this._body.Deserialize(p_serial); }
        return this._body;
    }


    /**
     * Requests body to be loaded, 
     * @param {*} p_callback 
     */
    RequestBody(p_callback) {
        if (this._requestCBs.Has(p_callback)) { return; }
        this._requestCBs.Add(p_callback);
        this.Broadcast(SIGNAL.ENTITY_BODY_REQUESTED, this, this._OnBodyRequestHandled);
    }

    /**
     * Body is expected to exist if resolution is positive
     * @param {*} p_err 
     * @returns 
     */
    _OnBodyRequestHandled(p_err) {

        if (p_err) {
            this._requestCBs.Notify(this, p_err).Clear();
            return;
        }

        this._requestCBs.Notify(this, this._body).Clear();

    }

    _CleanUp() {
        this.header = null;
        super._CleanUp();
    }


}

module.exports = AbstractEntity;