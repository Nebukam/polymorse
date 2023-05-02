'use strict';

const nkm = require(`@nkmjs/core`);
const IDS = require(`./ids`);

const OpenAIAPI = require(`./openai`);

const base = nkm.com.pool.DisposableObjectEx;
class TranslateBody extends base {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._body = null;
        this._running = false;
        this._callbacks = new nkm.com.helpers.Callbacks();

        this._Bind(this._OnBodySuccess);
        this._Bind(this._OnBodyError);
        this._Bind(this._OnSummarySuccess);
        this._Bind(this._OnSummaryError);

    }

    get cbs() { return this._callbacks; }

    Process(p_body) {

        if (this._running) { return; }

        this._body = p_body;
        this._result = {};
        this._summary = ``;

        // Create a request for each body block
        this._body.blocks.ForEach(block => {
            let blockID = block.uuid;
            OpenAIAPI.Translate(`some text`, `fr`)
                .then((...args) => { 
                    console.log(args); //Need to know what we receive T_T
                    this._result[blockID] = null; 
                })
                .catch();
        });

        return this._callbacks;

    }

    _OnBodySuccess() {
        // Enable a temp view renderer for the API to TLDR
    }

    _OnBodyError() {
        // Huh-huh
    }

    _OnSummarySuccess() {
        // Summary has been processed
    }

    _OnSummaryError() {

    }

    _CleanUp() {
        this._body = null;
        this._running = false;
        super._CleanUp();
    }

}

module.exports = TranslateBody;