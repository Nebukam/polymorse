'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.actions.AbstractAction;
class AbstractUserAction extends base {
    constructor() { super(); }

    static __model = {};

    _InternalExecute(p_op) {
        
        //Ensure a user is defined before proceeding
        if (!p_op.user) { 

            //No user is set in the request

            return false; 
        }


        return false;
    }

}

module.exports = AbstractUserAction;