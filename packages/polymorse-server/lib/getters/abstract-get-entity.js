'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.getters.AbstractGetter;
class AbstractGetEntity extends base {
    constructor() { super(); }

    static __NFO__ = null;

    _InternalExecute(p_params) {

    }

}

module.exports = AbstractGetEntity;