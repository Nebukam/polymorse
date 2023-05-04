'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const base = require(`./abstract-request`);
class AbstractChatRequest extends base {
    constructor() { super(); }

    static __apiPath = `/v1/chat/completions`;

    static __defaultSystem = `You are a useful assistant`;
    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`system`, null, null, `__defaultSystem`)
        .To(`content`, null, ``);

    _Init() {
        super._Init();
        this._system = this.constructor.__defaultSystem;
        this._content = ``;
    }

    get system() { return this._system; }
    set system(p_value) { this._system = p_value; }

    _PrepareSystem() { return this._system; }

    get content() { return this._content; }
    set content(p_value) { this._content = p_value; }

    _PrepareContent() { return this._content; }

    _BuildRequestBody() {
        return {
            messages: [
                {
                    role: "system",
                    content: this._PrepareSystem()
                },
                {
                    role: "user",
                    content: this._PrepareContent()
                }]
        };
    }

    _CleanUp(){
        this._system = this.constructor.__defaultSystem;
        this._content = ``;
        super._CleanUp();
    }

}

module.exports = AbstractChatRequest;