'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require("../signal");

const base = nkm.com.Observable;
class Registry extends base {
    constructor(p_entityClass = null) {
        super();
        this._entityClass = p_entityClass || this.constructor.__entityClass;
        this._onCreatedFn = null;
    }

    static __entityClass = null;

    _Init() {
        super._Init();
        this._map = {};
        this._entities = [];
        this._entitiesObserver = new nkm.com.signals.Observer();
        this._entitiesObserver
            .Hook(SIGNAL.ENTITY_BODY_REQUESTED, this._OnEntityBodyRequest, this);
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

    _OnEntityBodyRequest(p_entity) {
        this.Broadcast(SIGNAL.ENTITY_BODY_REQUESTED, this, p_entity);
    }

}

module.exports = Registry;