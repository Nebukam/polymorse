'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const IDS = require(`./ids`);

const _id_MAX_CHAR = `maxChars`;
const _id_URL = `url`;

const base = require(`./abstract-chat-request`);
class WhisperRequest extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(_id_MAX_CHAR, null, 140)
        .To(_id_URL, null, ``);

    //TODO!!!

    _BuildRequestBody() {

    }

}

module.exports = WhisperRequest;