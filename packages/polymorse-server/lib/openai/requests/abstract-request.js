'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const IDS = require(`./ids`);

const OpenAIAPI = require(`../openai`);

const _id_MODEL = `model`;

const base = nkm.com.pool.DisposableObjectEx;
class AbstractRequest extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext()
        .To(_id_MODEL, null, `gpt-3.5-turbo`);

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.constructor.__distribute.Update(this, p_options);
    }

    _Init() {

        super._Init();

        this._running = false;
        this._callbacks = new nkm.com.helpers.Callbacks();

        this._cachedBody = null;

        this._Bind(this._OnSuccess);
        this._Bind(this._OnReply);
        this._Bind(this._OnError);

    }

    get cbs() { return this._callbacks; }

    Send(p_options = null) {

        if (this._running) { return; }

        this._running = true;
        if (p_options) { this.options = p_options; }

        this._BuildRequest()
            .then(this._OnSuccess)
            .catch(this._OnError);

        return this._callbacks;

    }

    _BuildRequest() {
        throw new Error(`not implemented`);
    }

    _BuildRequestBody() {
        throw new Error(`not implemented`);
    }

    _OnReply() {
        // Either success or retry
    }

    _OnSuccess() {
        // Enable a temp view renderer for the API to TLDR
        this._callbacks.OnSuccess(this).Clear();
        this._OnEnd();
    }

    _OnError() {
        // Huh-huh
        this._callbacks.OnError(this).Clear();
        this._OnEnd();
    }

    _OnEnd() {
        this._running = false;
    }


    _CleanUp() {
        this._options = null;
        this._result = null;
        this._running = false;
        super._CleanUp();
    }

}

module.exports = AbstractRequest;