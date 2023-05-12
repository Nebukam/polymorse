'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require("../signal");
const CONTEXT = require(`../context`);

const base = nkm.com.Observable;
class Registry extends base {

    static __entityKey = null;

    constructor(p_entityKey = null) {
        super();

        let eKey = p_entityKey || this.constructor.__entityKey;
        if (nkm.u.isInstanceOf(eKey, nkm.com.helpers.CSYMBOL)) {
            this._entityClass = nkm.com.BINDINGS.Get(
                CONTEXT.ENTITIES, eKey, null);
        } else {
            this._entityClass = eKey;
        }

        this._onCreatedFn = null;

    }

    _Init() {
        super._Init();
        this._map = {};
        this._entities = [];
        this._entitiesObserver = new nkm.com.signals.Observer();
        this._entitiesObserver
            .Hook(SIGNAL.REQUEST_LOAD, this._OnBlockRequestLoad, this)
            .Hook(SIGNAL.REQUEST_SAVE, this._OnBlockRequestSave, this);
    }

    get onCreatedFn() { return this._onCreatedFn; }
    set onCreatedFn(p_value) { this._onCreatedFn = p_value; }

    Create(p_uid, p_options = null) {

        if (p_uid in this._map) { throw new Error(`Entity with uid '${p_uid}' already exist!`); }

        let newEntity = nkm.com.Rent(this._entityClass);
        newEntity.uuid = p_uid;

        this._map[p_uid] = newEntity;
        this._entities.push(newEntity);

        if (p_options) {
            if (p_options.header) {
                newEntity.LoadHeader(p_options.header);
            }
        }


        if (this._onCreatedFn) { this._onCreatedFn(newEntity, p_options); }
        this._entitiesObserver.Observe(newEntity);

        this.Broadcast(SIGNAL.ENTITY_CREATED, this, newEntity, p_options);

        return newEntity;

    }

    Get(p_uid) { return p_uid in this._map ? this._map[p_uid] : null; }

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

    _CleanUp() {
        this._map = {};
        this._entities.length = 0;
        super._CleanUp();
    }

    _OnBlockRequestLoad(p_block, p_callback) {
        this.Broadcast(SIGNAL.REQUEST_LOAD, this, p_block, p_callback);
    }

    _OnBlockRequestSave(p_block, p_callback) {
        this.Broadcast(SIGNAL.REQUEST_SAVE, this, p_block, p_callback);
    }

}

module.exports = Registry;