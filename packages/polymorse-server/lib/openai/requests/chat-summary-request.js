'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const IDS = require(`./ids`);

const _id_MAX_CHAR = `maxChars`;
const _id_URL = `url`;

const base = require(`./abstract-chat-request`);
class ChatSummaryRequest extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(_id_MAX_CHAR, null, 140)
        .To(_id_URL, null, ``);

    _BuildRequestBody() {

        let charLimit = this[_id_MAX_CHAR];
        if (charLimit > 0) {
            return [{
                role: "user",
                system: `You are a summarization engine.`,
                content: `TLDR of maximum ${charLimit} characters in the original language: ${this[_id_URL]}`
            }];
        } else {
            return [{
                role: "user",
                system: `You are a summarization engine.`,
                content: `TLDR in the original language: ${this[_id_URL]}`
            }];
        }

    }

}

module.exports = ChatSummaryRequest;