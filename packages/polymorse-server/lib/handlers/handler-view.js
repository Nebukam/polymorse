'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

class ViewHandler extends nkm.server.handlers.View {
    constructor() { super(); }

    get user() { return this._user; }

    PostprocessLocals(p_locals){
        // Inject bloc id mappings
    }

    GetView(){
        let viewId = super.GetView();
        //
        return viewId;
    }

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

module.exports = ViewHandler;