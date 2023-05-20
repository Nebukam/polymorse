'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const PolyLink = require(`../../links/polycore-link`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class GetRegistries extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.ops.getRegistries;

    async _InternalExecute(p_params) {

        let
            list = PolyLink._regLinks,
            data = {};

        for (const rLink of list) {
            let
                r = rLink.registry,
                registryDump = {
                    entities: []
                };
            for (const e of r._entities) { registryDump.entities.push(e.Serialize()); };
            data[r.name] = registryDump;
        }

        this._output = data;
        this._OnSuccess();

    }

}

module.exports = GetRegistries;


