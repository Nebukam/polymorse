'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);

class UserActionHandler extends nkm.server.handlers.POST {
    constructor() { super(); }

    _SanitizeRequest(p_request) {
        //TODO: Validate user is authenticated here
        //Either through oidc or cookies..?

        //If user is authenticated but does not exist
        //TODO: If user does not exist, create it!

        //if(!p_request.params.id){ return false; }
        //if(p_request.params.id == ``){ return false; }
        //this._id = p_request.params.id;

        console.log(p_request);
        return true;

    }

}

module.exports = UserActionHandler;