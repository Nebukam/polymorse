'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class AbstractUserAction extends base {
    constructor() { super(); }

    async _InternalExecute(p_params) {
        
        //Ensure a user is defined before proceeding
        if (!p_params.user) { 

            //No user is set in the request

            return this._OnError();
        }


        return this._OnError();
    }

}

module.exports = AbstractUserAction;