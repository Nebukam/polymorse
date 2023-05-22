'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
const FLAGS = {};

FLAGS.PENDING = Object.freeze(`pending`);
FLAGS.STATE_DRAFT = Object.freeze(`draft`);
FLAGS.STATE_PUBLISHING = Object.freeze(`publishing`);
FLAGS.STATE_PUBLISHED = Object.freeze(`published`);

FLAGS.LOCALIZABLE = Object.freeze(`localizable`);

module.exports = FLAGS;