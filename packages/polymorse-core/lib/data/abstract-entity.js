'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);
const CONTEXT = require("../context");

const AbstractData = require("./abstract-data");
const MorseHeader = require(`./page-header`);


const _id_HEADER = Object.freeze('header');
const _id_BODY = Object.freeze('body');

const base = AbstractData;
const JSONS = nkm.data.serialization.JSONSerializer;

class AbstractEntity extends base {
    constructor() { super(); }

    static __headerKey = null;
    static __bodyKey = null;

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:entity`
    }, base);

    _Init() {
        super._Init();

        this._internalBlocks = new nkm.collections.List();

        this._header = null;
        this._body = null;

        this._Bind(this._OnSubRequestLoad);
        this._Bind(this._OnSubRequestSave);
        this._Bind(this.Dirty);
        this._Bind(this._TryClearDirty);

    }

    get header() { return this._header; }
    set header(p_value) {
        if (this._AssignBlock(_id_HEADER, p_value)) {
            p_value.Watch(nkm.com.SIGNAL.VALUE_CHANGED,
                (...args) => { this.Broadcast(SIGNAL.HEADER_VALUE_CHANGED, ...args); });
        }
    }

    get body() { return this._body; }
    set body(p_value) {
        if (this._AssignBlock(_id_BODY, p_value)) {
            p_value.Watch(nkm.com.SIGNAL.VALUE_CHANGED,
                (...args) => { this.Broadcast(SIGNAL.BODY_VALUE_CHANGED, ...args); });
        }
    }

    _AssignBlock(p_id, p_value = null) {

        let localId = `_${p_id}`;

        if (this[localId] == p_value) { return null; }

        let oldBlock = this[localId];
        this[localId] = null;

        if (oldBlock) {
            this._internalBlocks.Remove(oldBlock);
            oldBlock.parent = null;
            oldBlock.Release();
        }

        if (p_value) {
            this._internalBlocks.Add(p_value);
            this[localId] = p_value;
            p_value.parent = this;
            p_value
                .Watch(nkm.com.SIGNAL.RELEASED, () => { this[p_id] = null; })
                .Watch(nkm.data.SIGNAL.DIRTY_CLEARED, this._TryClearDirty)
                .Watch(SIGNAL.REQUEST_LOAD, (block, p_callback) => { this.Broadcast(SIGNAL.REQUEST_LOAD, block, p_callback); })
                .Watch(SIGNAL.REQUEST_SAVE, (block, p_callback) => { this.Broadcast(SIGNAL.REQUEST_SAVE, block, p_callback); });

            return p_value;
        }

    }

    _TryClearDirty() {
        let anyDirty = false;
        this._internalBlocks.ForEach(b => { if (b.isDirty) { isDirty = true; } });
        if (!anyDirty) { this.ClearDirty(); }
    }

    _CreateSub(p_key) {
        let cl = p_key;
        if (nkm.u.isInstanceOf(cl, nkm.com.helpers.CSYMBOL)) {
            cl = nkm.com.BINDINGS.Get(CONTEXT.ENTITIES, p_key, null);
        }
        return nkm.com.Rent(cl);
    }

    _OnSubRequestLoad(p_sub, p_callback) { this.Broadcast(SIGNAL.REQUEST_LOAD, p_sub, p_callback); }
    _OnSubRequestSave(p_sub, p_callback) { this.Broadcast(SIGNAL.REQUEST_SAVE, p_sub, p_callback); }

    LoadHeader(p_serial = null, p_requestLoad = null) {
        if (!this._header) { this.header = this._CreateSub(this.constructor.__headerKey); }
        if (p_serial) { this._header.Deserialize(p_serial); }
        else if (p_requestLoad) { this._header.RequestLoad(p_requestLoad); }
        return this._header;
    }

    LoadBody(p_serial = null, p_requestLoad = null) {
        if (!this._body) { this.body = this._CreateSub(this.constructor.__bodyKey); }
        if (p_serial) { this._body.Deserialize(p_serial); }
        else if (p_requestLoad) { this._body.RequestLoad(p_requestLoad); }
        return this._body;
    }

    Update(p_options = null) {
        if (!p_options) { return; }
        if (p_options.header) { this.LoadHeader(p_options.header); }
        if (p_options.body) { this.LoadBody(p_options.body); }
    }

    ///

    CreateBlock(p_uid, p_class) {
        if (!this._body) { this.LoadBody(); }
        return this._body.CreateBlock(p_uid, p_class);
    }

    ///

    _CleanUp() {
        this.header = null;
        this.body = null;
        super._CleanUp();
    }

    Deserialize(p_serial) {
        if (p_serial.entity) { super.Deserialize(p_serial.entity); }
        if (p_serial.header) { this.LoadHeader(p_serial.header); }
        if (p_serial.body) { this.LoadBody(p_serial.body); }
    }

    Serialize() {
        let serial = { entity: super.Serialize(this) };
        if (this._header) { serial.header = this._header.Serialize(); }
        if (this._body) { serial.body = this._body.Serialize(); }
        return serial;
    }

    //#region header metadata

    Set(p_key, p_value) { this.LoadHeader().metadata.Set(p_key, p_value); }

    Get(p_key) { return this.LoadHeader().metadata.Get(p_key); }

    GetOrSet(p_key, p_value) { return this.LoadHeader().metadata.GetOrSet(p_key, p_value); }

    //#endregion


}

module.exports = AbstractEntity;