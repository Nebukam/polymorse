'use strict';

const nkmServer = require(`@nkmjs/core/server`);
const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkmServer.actions.AbstractAction;
class AbstractUserAction extends base {
    constructor() { super(); }

    static __model = {};

    _InternalExecute(p_op) {
        
        //Ensure a user is defined before proceeding
        if (!p_op.user) { 

            //No user is set in the request

            return false; 
        }

        //Ensure user exists
        let userEntity = polyCore.PolyMorse.userRegistry.Get(p_op.user);
        if (!userEntity) { return false; }

        //


        return false;
    }

}

module.exports = AbstractUserAction;