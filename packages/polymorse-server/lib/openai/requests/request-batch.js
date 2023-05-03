'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const IDS = require(`./ids`);

const OpenAIAPI = require(`../openai`);

const base = nkm.com.pool.DisposableObjectEx;
class RequestBatch extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext();

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

        this._Bind(this._OnReqSuccess);
        this._Bind(this._OnReqError);

        this._Bind(this._OnSuccess);
        this._Bind(this._OnReply);
        this._Bind(this._OnError);

    }

    get cbs() { return this._callbacks; }

    /**
     * 
     * @param  {...any} requests [ {type:Class, ...options} ]
     * @returns 
     */
    Send(...requests) {

        if (this._running) { return; }

        this._running = true;
        this._completeCount = 0;
        this._requests = [];

        requests.forEach(req => {
            let r = nkm.com.Rent(req.type);
            this._requests.push(r);
            r.Send(req)
                .then(this._OnReqSuccess)
                .catch(this._OnReqError);
        });

        return this._callbacks;

    }

    _OnReply() {
        // Either success or retry
    }

    _OnReqSuccess(p_req) {
        this._completeCount++;
    }

    _OnReqError(p_req) {
        this._completeCount++;
    }

    _OnSuccess() {

        this._callbacks.OnSuccess(this).Clear();
        this._OnEnd();
    }

    _OnError() {

        this._callbacks.OnError(this).Clear();
        this._OnEnd();
    }

    _OnEnd() {
        this._running = false;
    }


    _CleanUp() {
        this._running = false;
        this._requests = [];
        super._CleanUp();
    }

}

module.exports = RequestBatch;