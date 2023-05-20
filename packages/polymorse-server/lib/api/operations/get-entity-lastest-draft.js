'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetDraft extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.ops.getDraft;

    _Init(){
        super._Init();
        this._registry = polyCore.PolyMorse.draftRegistry;
    }

}

module.exports = GetDraft;