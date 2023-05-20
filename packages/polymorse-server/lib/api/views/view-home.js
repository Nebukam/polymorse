'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class ViewHome extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.views.viewHome;

    async _InternalExecute(p_params) {

        let out = {};

        // TODO : Select content to display on the home here

        this._OnSuccess(out);

    }    

}

module.exports = ViewHome;