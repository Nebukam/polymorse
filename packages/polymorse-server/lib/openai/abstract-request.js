'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const FLAGS = require(`../flags`);

const __usage = Object.freeze({ prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 });
const _type_CHAT_COMPLETION = `chat.completion`;
const _type_TEXT_COMPLETION = `text_completion`;

const _empty_CHAT_COMPLETION = Object.freeze({
    status: 200,
    json: () => {
        return {
            usage: __usage,
            choices: [{ message: { content: '' } }]
        };
    }
});

const _empty_TEXT_COMPLETION = Object.freeze({
    status: 200,
    json: () => {
        return {
            usage: __usage,
            choices: [{ text: '' }]
        };
    }
});

const base = nkm.com.Observable;
class AbstractRequest extends base {
    constructor() { super(); }

    static Send(p_options) {
        return nkm.com.Rent(this).Send(p_options);
    }

    static __apiPath = `/v1/chat/completions`;
    static __defaultTimeout = 300000;
    static __defaultModel = `gpt-3.5-turbo`;

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext()
        .To(`timeout`, null, null, `__defaultTimeout`)
        .To(`model`, null, null, `__defaultModel`)
        .To(`temperature`, null, 0)
        .To(`maxToken`, null, 0);

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

        this._controller = new AbortController();

        this._timeoutId = null;
        this._retryId = null;
        this._retryTime = 2500;
        this._cachedRequestOptions = null;

        this._timeout = this.constructor.__defaultTimeout;
        this._model = this.constructor._defaultModel;
        this._usage = __usage;
        this._state = FLAGS.PENDING;

        this._Bind(this._OnSuccess);
        this._Bind(this._OnResult);
        this._Bind(this._OnError);

    }

    get state() { return this._state; }

    get timeout() { return this._timeout; }
    set timeout(p_value) { this._timeout = p_value; }

    get model() { return this._model; }
    set model(p_value) { this._model = p_value; }

    get temperature() { return this._temperature; }
    set temperature(p_value) { this._temperature = p_value; }

    get maxToken() { return this._maxToken; }
    set maxToken(p_value) { this._maxToken = 0; }

    get usage() { return this._usage; }

    get running() { return this._running; }

    get cbs() { return this._callbacks; }

    Send(p_options = null) {

        if (this._running) { return; }

        this._state = FLAGS.PENDING;
        this._running = true;
        if (p_options) { this.options = p_options; }
        else { this.options = {}; }

        let requestBody = {
            model: this.model,
            temperature: this._temperature,
            ...this._BuildRequestBody()
        };

        if (this._maxToken > 0) { requestBody.max_token = this._maxToken; }

        this._timeoutId = setTimeout(() => { console.log(`timed out!`); this._controller.abort(); }, this._timeout);

        let
            requestOptions = {
                signal: this._controller.signal,
                method: "POST",
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'OpenAI-Organization': process.env.OPENAI_API_ORG
                },
            }

        this._cachedRequestOptions = requestOptions;
        this._Fetch(requestOptions);

        return this._callbacks;

    }

    _BuildRequest() {
        throw new Error(`not implemented`);
    }

    _BuildRequestBody() {
        throw new Error(`not implemented`);
    }

    _Fetch(p_options) {
        return fetch(`https://api.openai.com${this.constructor.__apiPath}`, p_options)
            .catch(this._OnError)
            .then(this._OnSuccess);
    }

    _OnSuccess(p_res) {

        if (!p_res) { return; }//This happens on error.

        switch (p_res.stats) {
            case 200: //OK
                p_res.json()
                    .then((p_res) => {
                        this._usage = p_res.usage;
                        this._result = '';
                        switch (p_res.object) {
                            case _type_CHAT_COMPLETION:
                                this._result = p_res.choices[0].message.content;
                                this._OnResult(p_res);
                                break;
                            case _type_TEXT_COMPLETION:
                                this._result = p_res.choices[0].text;
                                this._OnResult(p_res);
                                break;
                        }
                    })
                    .catch((e) => this._OnError(e));
                break;
            case 429: //Rate limit
                clearTimeout(this._timeoutId);
                this._retryTime *= 2; //Backoff
                this._retryId = setTimeout(() => { this._Fetch(this._cachedRequestOptions); }, this._retryTime);
                break;
            default:
                this._OnError(new Error(`Unhandled status code: ${p_res.status}`));
                break;
        }

    }

    _OnResult(p_json) {
        this._state = FLAGS.SUCCESS;
        this._callbacks.OnSuccess(this).Clear();
        this._OnEnd();
    }

    _OnError(p_err) {
        this._state = FLAGS.ERROR;
        console.log(`_OnError: `, p_err);
        this._callbacks.OnError(this).Clear();
        this._OnEnd();
    }

    _OnEnd() {
        clearTimeout(this._timeoutId);
        this._running = false;
    }

    _CleanUp() {

        this._state = FLAGS.PENDING;

        this._cachedRequestOptions = null;
        this._retryTime = 2500;

        this._timeout = this.constructor.__defaultTimeout;
        this._model = this.constructor.__defaultModel;
        this._usage = __usage;

        this._options = null;
        this._result = null;
        this._running = false;

        super._CleanUp();
    }

}

module.exports = AbstractRequest;