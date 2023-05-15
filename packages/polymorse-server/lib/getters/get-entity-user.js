'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetUser extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getUser;

    _InternalExecute(p_params) {

        let targetUser = polyCore.PolyMorse.userRegistry.Get(p_params.id);
        if (!targetUser) { return false; }

        this._response = targetUser.Serialize();
        return true;

    }

}

module.exports = GetUser;