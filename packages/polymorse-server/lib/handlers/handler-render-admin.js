'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const base = require(`./handler-render`);
class AdminRenderHandler extends base {
    constructor() { super(); }

    _SanitizeRequest(p_request) {

        let sup = super._SanitizeRequest(p_request);
        if (!sup) { return false; }

        //

        return true;

    }

}

module.exports = AdminRenderHandler;