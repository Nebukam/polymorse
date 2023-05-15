'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.getters.AbstractGetter;
class GetListSettings extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getListSettings;

    _InternalExecute(p_params) {

        //TODO: Make this async

        let list = [],
            data = { users: list };

        let users = polyCore.PolyMorse.userRegistry.entities;
        users.forEach((user) => {
            let u = {
                uid: user.uuid
            };
            if (user.header) { u.header = user.header.Serialize(); }
            list.push(u);
        });

        this._response = data;

        return true;

    }

}

module.exports = GetListSettings;