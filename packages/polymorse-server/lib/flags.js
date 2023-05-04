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
    static ERROR = Object.freeze(`error`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static SUCCESS = Object.freeze(`success`);

}

module.exports = FLAGS;