'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.getters.AbstractGetter;
class GetListTags extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.getListUsers;

    _InternalExecute(p_params) {

        //TODO: Make this async
        
        let list = [],
            data = { users: list };

        let users = polyCore.PolyMorse.userRegistry.entities;
        users.forEach((user) => {
            let u = {
                uid: user.uuid
            };
            if (user.header) {

            }
            list.push(u);
        });

        this._response = data;
        
        return true;

    }

}

module.exports = GetListTags;