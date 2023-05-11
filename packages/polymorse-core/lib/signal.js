'use strict';

module.exports = {

    /**
     * @description State changed
     * @type {symbol}
     * @customtag read-only
     * @group State
     */
    STATE_CHANGED: Symbol(`stateChanged`),

    /**
     * @description Entity created
     * @type {symbol}
     * @customtag read-only
     * @group State
     */
    ENTITY_CREATED: Symbol(`entityCreated`),

    /**
     * @description Entity request body loading
     * @type {symbol}
     * @customtag read-only
     * @group State
     */
    ENTITY_BODY_REQUESTED: Symbol(`bodyRequest`),


}