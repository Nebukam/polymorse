'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const IDS = require(`./ids`);

const OpenAI = require(`../openai`);

const base = require(`./abstract-request`);
class AbstractChatRequest extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base);

    get cbs() { return this._callbacks; }

    _BuildRequest() {
        return OpenAI.api.createChatCompletion({
            model: this[_id_MODEL],
            messages: this._BuildRequestBody()
        });
    }

    _BuildRequestBody() {
        throw new Error(`not implemented`);
    }

    _OnSuccess() {
        // Enable a temp view renderer for the API to TLDR
    }

    _OnError() {
        // Huh-huh
    }

}

module.exports = AbstractChatRequest;