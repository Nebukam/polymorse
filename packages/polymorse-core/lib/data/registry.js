'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require("../signal");

const base = nkm.com.pool.DisposableObjectEx;
class Registry extends base {
    constructor(p_entityClass = null) {
        super();
        this._entityClass = p_entityClass || this.constructor.__entityClass;
    }

    static __entityClass = null;

    _Init() {
        super._Init();
        this._map = {};
        this._entities = [];
    }

    Create(p_uid) {

        let newEntity = nkm.com.Rent(this._entityClass);
        newEntity.uuid = p_uid;

        this._map[p_uid] = newEntity;
        this._entities.push(newEntity);

        this.Broadcast(SIGNAL.ENTITY_CREATED, this, newEntity);

        return newEntity;

    }

    Get(p_uid) { return p_uid in this._map ? this._map[p_uid] : null; }

    Remove(p_uid) {

        if (!(p_uid in this._map)) { return false; }

        let
            entity = this._map[p_uid],
            index = this._entities.indexOf(entity);

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


}

module.exports = Registry;