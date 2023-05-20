'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);
const CTX = require("../context");

const AbstractData = require("./abstract-data");
const MorseHeader = require(`./page-header`);


const _id_HEADER = Object.freeze('header');
const _id_BODY = Object.freeze('body');

const base = AbstractData;
const JSONS = nkm.data.s11n.JSONSerializer;

class AbstractEntity extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:entity`
    }, base);

    static __BLOCS = {
        [IDS.BLOC_HEADER]: { type: null },
        [IDS.BLOC_BODY]: { type: null },
    };

    _Init() {
        super._Init();
    }

    _InitBloc(p_newBloc, p_def) {
        super._InitBloc(p_newBloc, p_def);
        p_newBloc
            .Watch(nkm.data.SIGNAL.DIRTY_CLEARED, () => { nkm.data.SIMPLEX.TryClearDirtyDeep(this); })
            .Watch(SIGNAL.REQUEST_LOAD, this._OnBlocRequestLoad, this)
            .Watch(SIGNAL.REQUEST_SAVE, this._OnBlocRequestSave, this)
            .Watch(nkm.com.SIGNAL.VALUE_CHANGED, (...args) => { this.Broadcast(SIGNAL.BLOC_VALUE_CHANGED, p_newBloc, ...args); });
    }

    get header() { return this._header; }
    get body() { return this._body; }

    async LoadBloc(p_id, p_serial, p_requestLoad = null) {
        let bloc = this[`_${p_id}`];
        if (p_serial) {
            bloc.Deserialize(p_serial);
            return bloc;
        } else if (p_requestLoad) {
            return bloc.RequestLoad(p_requestLoad);
        }
        return bloc;
    }

    _OnBlocRequestLoad(p_bloc, p_callback) { this.Broadcast(SIGNAL.REQUEST_LOAD, p_bloc, p_callback); }
    _OnBlocRequestSave(p_bloc, p_callback) { this.Broadcast(SIGNAL.REQUEST_SAVE, p_bloc, p_callback); }

    Update(p_options = null) {
        if (!p_options) { return; }
        for (let id in p_options) { this.LoadBloc(id, p_options[id]); }
    }

    ///

    _CleanUp() {
        super._CleanUp();
    }

    //#region header metadata

    Set(p_key, p_value) { this._header.metadata.Set(p_key, p_value); }

    Get(p_key) { return this._header.metadata.Get(p_key); }

    GetOrSet(p_key, p_value) { return this._header.metadata.GetOrSet(p_key, p_value); }

    //#endregion


}

module.exports = AbstractEntity;