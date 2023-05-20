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

        await super._InternalExecute(p_params);

        let out = {};

        this._OnSuccess(out);

    }

}

module.exports = ViewPage;