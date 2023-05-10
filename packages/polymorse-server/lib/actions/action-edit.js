'use strict';

const nkmServer = require(`@nkmjs/core/server`);
const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-update-action`);
class EditAction extends base {
    constructor() { super(); }

    static __model = {
        target:`uid`
    };

    _InternalExecute(p_op) {
        return false;
    }

}

module.exports = EditAction;