'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-update-action`);
class UpdatePage extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.actions.updatePage;

    async _InternalExecute(p_params) {

        await super._InternalExecute(p_params, false);

        //TODO: Generate a summary in each locale
        //Update page header' summary in each locale
        //Save page.

        return false;
    }

}

module.exports = UpdatePage;