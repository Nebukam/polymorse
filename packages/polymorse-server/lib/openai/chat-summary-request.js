'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const base = require(`./abstract-chat-request`);
class ChatSummaryRequest extends base {
    constructor() { super(); }

    static __defaultSystem = `You are a summarization engine.`;
    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`maxChars`, null, 140);

    _Init() {
        super._Init();
        this._maxChars = 140;
    }

    get maxChars() { return this._maxChars; }
    set maxChars(p_value) { this._maxChars = p_value; }

    _PrepareContent() {
        let charLimit = this.maxChars;
        if(charLimit > 0){
            return `TLDR of maximum ${charLimit} characters in the original language: ${this.content}`;
        }else{
            return `TLDR in the original language: ${this.content}`;
        }
    }

}

module.exports = ChatSummaryRequest;