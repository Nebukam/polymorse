'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class ViewAdmin extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.views.viewAdmin;

    async _InternalExecute(p_params) {

        await super._InternalExecute(p_params);

        let out = {};

        this._OnSuccess(out);

    }   

}

module.exports = ViewAdmin;