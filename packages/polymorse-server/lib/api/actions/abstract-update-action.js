'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class AbstractUpdateAction extends base {
    constructor() { super(); }

    // Add QoL methods to check user has the right to to the update

}

module.exports = AbstractUpdateAction;