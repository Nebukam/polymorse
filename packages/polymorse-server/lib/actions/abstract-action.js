'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.com.pool.DisposableObjectEx;
class AbstractAction extends base {
    constructor() { super(); }

    static __model = {};

    Execute(p_body) {
        return true;
    }

}

module.exports = AbstractAction;