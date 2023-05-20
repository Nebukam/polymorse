'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const polyLinks = require(`../../links/polycore-link`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./tracked-entity-view`);
class ViewPage extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.views.viewPage;
    static __REG__ = polyCore.REG.PAGES;

    async _InternalExecute(p_params) {

        let entity = await super._InternalExecute(p_params);
        if (!entity) { return; }

        let out = {
            rawEntityString:JSON.stringify(entity.Serialize())
        };

        this._OnSuccess(out);

    }

}

module.exports = ViewPage;