'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require("../signal");
const CTX = require(`../context`);

const base = nkm.com.Observable;
class Registry extends base {

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext()
        .To(`system`, null, null, `__defaultSystem`)
        .To(`content`, null, ``);

    static __entityKey = null;

    constructor(p_name, p_entityKey = null) {
        super();

        let eKey = p_entityKey || this.constructor.__entityKey;
        if (nkm.u.isInstanceOf(eKey, nkm.com.CSYMBOL)) {
            this._entityClass = nkm.com.GetBinding(CTX.ENTITIES, eKey, null);
        } else {
            this._entityClass = eKey;
        }

        //Create a single instance to fix types early
        nkm.com.Rent(this._entityClass).Release();

        this._onCreatedFn = null;
        this._settings = null;
        this._name = p_name;

    }

    _Init() {
        super._Init();
        this._prefix = ``;
        this._map = {};
        this._entities = [];
        this._entitiesObserver = new nkm.com.signals.Observer();
        this._entitiesObserver
            .Hook(SIGNAL.REQUEST_LOAD, this._OnBlockRequestLoad, this)
            .Hook(SIGNAL.REQUEST_SAVE, this._OnBlockRequestSave, this)
            .Hook(SIGNAL.HEADER_VALUE_CHANGED, this._OnHeaderValueChanged, this)
            .Hook(SIGNAL.BODY_VALUE_CHANGED, this._OnBodyValueChanged, this);
    }

    get entityClass(){return this._entityClass;}
    
    get entitiesObserver() { return this._entitiesObserver; }

    get onCreatedFn() { return this._onCreatedFn; }
    set onCreatedFn(p_value) { this._onCreatedFn = p_value; }

    get name() { return this._name; }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.constructor.__distribute.Update(this, p_options);
    }

    get prefix() { return this._prefix; }
    set prefix(p_value) { this._prefix = p_value; }

    get settings() { return this._settings; }
    set settings(p_value) { this._settings = p_value; }

    InitSettings(p_callback, p_firstTime = true) { p_callback(); }

    get entities() { return this._entities; }

    Create(p_uid, p_options = null) {

        if (p_uid in this._map) { throw new Error(`Entity with uid '${p_uid}' already exist!`); }

        let newEntity = nkm.com.Rent(this._entityClass);
        newEntity.uuid = p_uid;

        this._map[p_uid] = newEntity;
        this._entities.push(newEntity);

        newEntity.Update(p_options);

        if (this._onCreatedFn) { this._onCreatedFn(newEntity, p_options); }
        this._entitiesObserver.Observe(newEntity);

        this.Broadcast(SIGNAL.ENTITY_CREATED, this, newEntity, p_options);

        return newEntity;

    }

    Get(p_uid) { return p_uid in this._map ? this._map[p_uid] : null; }

    GetOrCreate(p_uid, p_options = null) {
        let entity = this.Get(p_uid);
        if (!entity) { entity = this.Create(p_uid, p_options); }
        else { entity.Update(p_options); }
        return entity;
    }

    Remove(p_uid) {

        if (!(p_uid in this._map)) { return false; }

        let
            entity = this._map[p_uid],
            index = this._entities.indexOf(entity);

        this._entitiesObserver.Unobserve(entity);

        if (index != -1) { this._entities.splice(index, 1); }
        delete this._map[p_uid];

        return entity;

    }

    Filter(...filters) {

        let results = [];

        entityLoop: for (let i = 0, n = this._entities.length; i < n; i++) {
            let
                filter,
                entity = this._entities[i];

            filterLoop: for (let i = 0, n = filters.length; i < n; i++) {
                if (!filter(entity)) {
                    pass = false;
                    break filterLoop;
                }
            }

            if (pass) { results.push(entity); }

        }

        return results;

    }

    _OnBlockRequestLoad(p_block, p_callback) {
        this.Broadcast(SIGNAL.REQUEST_LOAD, this, p_block, p_callback);
    }

    _OnBlockRequestSave(p_block, p_callback) {
        this.Broadcast(SIGNAL.REQUEST_SAVE, this, p_block, p_callback);
    }

    _OnHeaderValueChanged(p_header, p_id, p_newValue, p_oldValue) {

    }

    _OnBodyValueChanged(p_body, p_id, p_newValue, p_oldValue) {

    }

    _CleanUp() {
        this._prefix = ``;
        this._map = {};
        this._entities.length = 0;
        super._CleanUp();
    }

}

module.exports = Registry;