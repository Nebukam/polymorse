'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetDraft extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getDraft;

    _InternalExecute(p_params) {

        //TODO: Make this async

        let targetDraft = polyCore.PolyMorse.pageRegistry.Get(p_params.id);
        if (!targetDraft) { return false; }

        this._response = targetDraft.Serialize();
        return true;

    }

}

module.exports = GetDraft;