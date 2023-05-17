'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-user-action`);
class CreatePageAction extends base {
    constructor() { super(); }

    static __NFO__ = {
        identifier:`draft`
    };

    _InternalExecute(p_op) {
        return false;
    }

}

module.exports = CreatePageAction;