'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-user-handler`);
class ActionHandler extends base {
    constructor() { super(); }

    _SanitizeRequest(p_request) {
        if (!this._SanitizeRequest(p_request)) { return false; }

        //Ensure that action target is owned by user.
        //Then, check action map and forward 

        return true;
    }

    //To send data back: this._res.send(json);
    Handle() {
        this._res.send({ value: "Test value" });
    }

}

module.exports = ActionHandler;