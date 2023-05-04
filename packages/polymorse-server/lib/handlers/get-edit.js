'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-user-handler`);
class GetEdit extends base {
    constructor() { super(); }

    _SanitizeRequest(p_request) {
        if (!this._SanitizeRequest(p_request)) { return false; }

        this._id = null;

        if (!p_request.params.id ||
            p_request.params.id == ``) {
                
            //No id provided
            //Either retrieve the last edited draft, if there is one
            //If no draft exist, then create a new one and edit it

            //Create a new page
            

            this._id = null;

        }else{
            
        }

        //Attempt to retrieve an existing page with the given id
        let page = this._id ? polyCore.PolyMorse.GetPage(this._id) : null;

        if(page){
            //If a page exist, ensure the current user is the owner of the page
        }

        if(!this._id || !page){
            this._id = nkm.u.tils.UUID;
            page = polyCore.PolyMorse.CreatePage(this._id);
        }

        console.log(p_request);
        return true;
    }

    //To send data back: this._res.send(json);
    Handle() {
        this._res.send({ value: "Test value" });
    }

}

module.exports = GetEdit;