'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class GetListUsers extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.ops.getListDrafts;

    async _InternalExecute(p_params) {

        //TODO: Make this async
        
        let list = [],
            data = { users: list };

        let users = polyCore.PolyMorse.userRegistry.entities;
        for(const user of users) {
            let u = {
                uid: user.uuid
            };
            if (user.header) {

            }
            list.push(u);
        };

        this._output = data;
        this._OnSuccess();

    }

}

module.exports = GetListUsers;