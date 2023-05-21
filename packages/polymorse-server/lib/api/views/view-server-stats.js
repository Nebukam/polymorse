'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const polyLinks = require(`../../links/polycore-link`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class TrackedEntityView extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.views.serverStatus;

    _Init() {
        super._Init();
    }

    async _InternalExecute(p_params) {

        this._output = { entity: polyCore.data.ToObject(entity) };
        
    }

    _CleanUp() {
        //Release entity if not in use
        super._CleanUp();
    }



}

module.exports = TrackedEntityView;