'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-update-action`);
class EditUnpublish extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.actions.unpublish;

    async _InternalExecute(p_params) {
        return false;
    }

}

module.exports = EditUnpublish;