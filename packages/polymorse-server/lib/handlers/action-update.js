'use strict';

/**
 * Post EDIT updates page data and saves it on disk.
 */
const base = require(`./abstract-post`);
class PostEdit extends base {
    constructor() { super(); }

    _SanitizeRequest(p_request) {
        //if(!p_request.params.id){ return false; }
        //if(p_request.params.id == ``){ return false; }
        //this._id = p_request.params.id;
        console.log(p_request);
        return true;
    }

    //To send data back: this._res.send(json);
    Handle() {
        this._res.send({ value: "Test value" });
    }

}

module.exports = GetEdit;