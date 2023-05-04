'use strict';

class SIGNAL {
    constructor() { }

    /**
     * @description State changed
     * @type {symbol}
     * @customtag read-only
     * @group State
     */
    static STATE_CHANGED = Symbol(`stateChanged`);

}

module.exports = SIGNAL;