'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
module.exports = {

    // Generics

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    PENDING: Object.freeze(`pending`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    STATE_DRAFT: Object.freeze(`draft`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    STATE_PUBLISHING: Object.freeze(`publishing`),

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    STATE_PUBLISHED: Object.freeze(`published`),

}