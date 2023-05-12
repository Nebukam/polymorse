'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const base = nkm.server.handlers.View;
class RenderHandler extends base {
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

}

module.exports = RenderHandler;