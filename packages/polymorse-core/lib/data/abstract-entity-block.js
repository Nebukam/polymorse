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

        this._Bind(this.SaveResolve);
        this._Bind(this.LoadResolve);

    }

    get uuid() { return this._parent.uuid; }
    set uuid(p_value) { return; }

    //#region Save

    async RequestSave(p_callback) {

        if (!this._savePromise) {
            this._saveRequestCBs = nkm.com.Rent(nkm.com.helpers.CallList);
            this._savePromise = new Promise((res, rej) => {
                this._saveResolve = res;
                this._saveReject = rej;
                this.Broadcast(SIGNAL.REQUEST_SAVE, this, this.SaveResolve);
            });
        }

        this._saveRequestCBs.Add(p_callback);
        return this._savePromise;

    }

    SaveResolve(p_err) {

        this.ClearDirty();

        this._savePromise = null;

        if (p_err) { this._saveReject(p_err); }
        else { this._saveResolve(this); }

        this._saveResolve = null;
        this._saveReject = null;

        this._saveRequestCBs.Notify(this, p_err).Release();
        this._saveRequestCBs = null;
        this.Broadcast(SIGNAL.SAVED, this);

    }

    //#endregion

    //#region Save

    async RequestLoad(p_callback) {

        if (!this._loadPromise) {
            this._loadRequestCBs = nkm.com.Rent(nkm.com.helpers.CallList);
            this._loadPromise = new Promise((res, rej) => {
                this._loadResolve = res;
                this._loadReject = rej;
                this.Broadcast(SIGNAL.REQUEST_LOAD, this, this.LoadResolve);
            });
        }

        this._loadRequestCBs.Add(p_callback);

        return this._loadPromise;

    }

    LoadResolve(p_err) {

        this.ClearDirty();
        
        this._loadRequestCBs.Notify(this, p_err).Release();
        this._loadRequestCBs = null;

        this._loadPromise = null;

        if (p_err) {
            this.loaded = false;
            this._loadReject(p_err);
        }
        else {
            this.loaded = true;
            this._loadResolve(this);
        }

        this._loadResolve = null;
        this._loadReject = null;

    }

    //#endregion
    
    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = AbstractEntityBlock;
