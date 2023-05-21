'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const { encode, decode } = require('gpt-3-encoder')
/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class CountTokens extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.actions.countTokens;

    async _InternalExecute(p_params) {

        let tokens = encode(p_params.body.content);
        this._OnSuccess({ count: tokens.length });

        tokens.length = 0;

    }

}

module.exports = CountTokens;