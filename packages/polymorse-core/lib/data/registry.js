'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

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

        return newEntity;

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