'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const PolyLink = require(`../links/polycore-link`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.getters.AbstractGetter;
class GetRegistries extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getRegistries;

    _InternalExecute(p_params) {

        //TODO: Make this async

        let
            list = PolyLink._regLinks,
            data = {};

        list.forEach(rLink => {
            let
                r = rLink.registry,
                registryDump = {
                    entities: []
                };
            r._entities.forEach(e => { registryDump.entities.push(e.Serialize()); });
            data[r.name] = registryDump;
        })

        this._response = data;

        return true;

    }

}

module.exports = GetRegistries;


