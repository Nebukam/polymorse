'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

class UserGetHandler extends nkm.server.handlers.GET {
    constructor() { super(); }

    _SanitizeRequest(p_request) {

        let sup = super._SanitizeRequest(p_request);
        if (!sup) { return false; }

        // Request authentication is handled by API Definition,
        // so if authentication is required by this handler
        // this code is only reached if the auth passes.

        //TODO: If user does not exist, create it!
        let polyUser = polyCore.PolyMorse.GetOrCreateUserByAuthID(
            nkm.env.app.GetUser(p_request));

        if (!polyUser) { return false; }

        p_request.polyUser = polyUser;

        //TODO: Make sure authenticated user has editing rights on the target object

        //TODO: Add user object to operation for the action to consume

        //if(!p_request.params.id){ return false; }
        //if(p_request.params.id == ``){ return false; }
        //this._id = p_request.params.id;

        console.log(p_request);
        return true;

    }

}

module.exports = UserGetHandler;