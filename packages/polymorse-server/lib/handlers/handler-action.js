'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

class UserActionHandler extends nkm.server.handlers.Action {
    constructor() { super(); }

    get user() { return this._user; }

    async Handle() {

        this._user = await Helper.GetOrCreateUser(this._req.user);

        if(!this._user){
            this.Abort(nkm.server.STATUSES.NOT_FOUND);
            return;
        }

        await super.Handle();
        
    }

    _CleanUp(){
        this._user = null;
        super._CleanUp();
    }

}

module.exports = UserActionHandler;