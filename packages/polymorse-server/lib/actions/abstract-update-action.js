'use strict';

const nkmServer = require(`@nkmjs/core/server`);
const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkmServer.actions.AbstractAction;
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