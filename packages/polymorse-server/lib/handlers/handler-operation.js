'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

class UserGetHandler extends nkm.server.handlers.Operation {
    constructor() { super(); }

    _SanitizeRequest(p_request) {

        let sup = super._SanitizeRequest(p_request);
        if (!sup) { return false; }

        // Request authentication is handled by API Definition,
        // so if authentication is required by this handler
        // this code is only reached if the auth passes.

        let polyUser = p_request.user;
        if (!polyUser) { return false; }

        //TODO: Add user object to operation for the action to consume

        //if(!p_request.params.id){ return false; }
        //if(p_request.params.id == ``){ return false; }
        //this._id = p_request.params.id;

        return true;

    }

    get user() { return this._user; }

    async Handle() {
        this._user = this._req.user;
        await super.Handle();
    }

    _CleanUp(){
        this._user = null;
        super._CleanUp();
    }

}

module.exports = UserGetHandler;