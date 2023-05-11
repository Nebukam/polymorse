'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-user-action`);
class AbstractUpdateAction extends base {
    constructor() { super(); }

    static __model = {
        target: `uid`
    };

    CanExecute(p_operation) {
        //TODO: Ensure user is authorized to update target
        return true;
    }

}

module.exports = AbstractUpdateAction;