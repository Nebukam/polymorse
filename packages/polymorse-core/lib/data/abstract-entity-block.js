'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const SIGNAL = require(`../signal`);
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

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:entity-block`,
        [nkm.com.IDS.TYPE]: `block`
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.UUID]: { value: 0, [nkm.data.IDS.SKIP_S11N]: true },
    });

    _Init() {
        super._Init();

        this._Bind(this.SaveRequestHandled);
        this._Bind(this.LoadRequestHandled);

    }

    get uuid() { return this._parent.uuid; }
    set uuid(p_value) { return; }

    RequestSave(p_callback) {
        if (!this._saveRequestCBs) { this._saveRequestCBs = nkm.com.Rent(nkm.com.helpers.CallList); }
        this._saveRequestCBs.Add(p_callback);
        this.Broadcast(SIGNAL.REQUEST_SAVE, this, this.SaveRequestHandled);
    }

    SaveRequestHandled(p_err) {
        this.ClearDirty();
        this._saveRequestCBs.Notify(this, p_err).Release();
        this._saveRequestCBs = null;
        this.Broadcast(SIGNAL.SAVED, this);
    }

    RequestLoad(p_callback) {
        if (!this._loadRequestCBs) { this._loadRequestCBs = nkm.com.Rent(nkm.com.helpers.CallList); }
        this._loadRequestCBs.Add(p_callback);
        this.Broadcast(SIGNAL.REQUEST_LOAD, this, this.LoadRequestHandled);
    }

    LoadRequestHandled(p_err) {
        this.ClearDirty();
        this._loadRequestCBs.Notify(this, p_err).Release();
        this._loadRequestCBs = null;
        this.Broadcast(SIGNAL.LOADED, this);
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = AbstractEntityBlock;
