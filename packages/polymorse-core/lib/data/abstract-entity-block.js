'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const SIGNAL = require(`../signal`);
const IDS = require(`./ids`);
const LOCALES = require(`../locales`);

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

        this._deferredSave = nkm.com.DeferredCall(
            () => { this.Broadcast(SIGNAL.REQUEST_SAVE, this, this._deferredSave.Resolve); },
            () => { this.ClearDirty(); this.Broadcast(SIGNAL.SAVED, this); },
        );

        this._deferredLoad = nkm.com.DeferredCall(
            () => { this.Broadcast(SIGNAL.REQUEST_LOAD, this, this._deferredLoad.Resolve); },
            () => { this.ClearDirty(); this.Broadcast(SIGNAL.LOADED, this); },
        );

        

    }

    get uuid() { this._parent.uuid; }
    set uuid(p_value) { return; }

    //#region Save

    async RequestSave(p_callback) {
        return p_callback ?
            this._deferredSave.Call().then(p_callback) :
            this._deferredSave.Call();
    }

    //#endregion

    //#region Save

    async RequestLoad(p_callback) {
        return p_callback ?
            this._deferredLoad.Call().then(p_callback) :
            this._deferredLoad.Call();
    }

    //#endregion

    
    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = AbstractEntityBlock;
