'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class FLAGS {
    constructor() { }

    // Generics

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static PENDING = Object.freeze(`pending`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static STATE_DRAFT = Object.freeze(`draft`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static STATE_PUBLISHING = Object.freeze(`publishing`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static STATE_PUBLISHED = Object.freeze(`published`);

}

module.exports = FLAGS;