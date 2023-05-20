'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./tracked-entity-view`);
class ViewProfile extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.views.viewProfile;
    static __REG__ = polyCore.REG.USERS;

    async _InternalExecute(p_params) {

        let entity = await super._InternalExecute(p_params);
        if (!entity) { return; }

        let out = {
            rawEntityString:JSON.stringify(entity.Serialize())
        };

        this._OnSuccess(out);

    }

}

module.exports = ViewProfile;