'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetPage extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getPage;

    _InternalExecute(p_params) {

        //TODO: Make this async

        let targetPage = polyCore.PolyMorse.pageRegistry.Get(p_params.id);
        if (!targetPage) { return false; }

        this._response = targetPage.Serialize();
        return true;

    }

}

module.exports = GetPage;