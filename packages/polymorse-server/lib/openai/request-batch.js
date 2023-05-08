'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const FLAGS = require(`../flags`);

const base = nkm.com.Observable;
class RequestBatch extends base {
    constructor() { super(); }

    static Send(...requests) {
        let newBatch = nkm.com.Rent(RequestBatch);
        return newBatch.Send(...requests);
    }

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
        this._requests = [];
        this._requestsOptions = null;

        this._Bind(this._OnReqSuccess);
        this._Bind(this._OnReqError);

        this._Bind(this._OnProgress);
        this._Bind(this._OnComplete);

    }

    get cbs() { return this._callbacks; }

    /**
     * 
     * @param  {...any} requests [ {type:Class, ...options} ]
     * @returns 
     */
    Send(...requests) {

        if (this._running) { return; }

        this._requestsOptions = requests;

        this._running = true;
        this._completeCount = 0;
        this._requests.length = 0;

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
        this._OnProgress();
    }

    _OnReqError(p_req) {
        this._completeCount++;
        this._errorCount++;
        this._OnProgress();
    }

    _OnProgress() {
        if (this._requests.length < this._completeCount) { return; }
        this._OnComplete();
    }

    _OnComplete() {
        this._running = false;
        if (this._errorCount == this._completeCount) { this._callbacks.OnError(this).Clear(); }
        else { this._callbacks.OnSuccess(this).Clear(); }
    }

    _CleanUp() {

        this._requests.forEach(req => { req.Release(); });

        this._running = false;
        this._requests.length = 0;
        this._requestsOptions.length = 0;

        super._CleanUp();

    }

}

module.exports = RequestBatch;