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

    /**
     * @description Entity created
     * @type {symbol}
     * @customtag read-only
     * @group State
     */
    static ENTITY_CREATED = Symbol(`entityCreated`);

}

module.exports = SIGNAL;