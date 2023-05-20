'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-update-action`);
class UpdateEntity extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.actions.update;

    async _InternalExecute(p_params) {
        return false;
    }

}

module.exports = UpdateEntity;