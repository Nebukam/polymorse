'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const base = require(`./abstract-request`);
class AbstractCompRequest extends base {
    constructor() { super(); }

    static __apiPath = `/v1/completions`;

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`content`, null, ``);

    _Init() {
        super._Init();
        this._content = ``;
    }

    get content() { return this._content; }
    set content(p_value) { this._content = p_value; }

    _PrepareContent() { return this._content; }

    _BuildRequestBody() {
        return { prompt: this._PrepareContent() };
    }

}

module.exports = AbstractCompRequest;