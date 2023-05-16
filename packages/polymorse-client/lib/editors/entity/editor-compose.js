'use strict';

const nkm = require(`@nkmjs/core`);

const widgets = require(`./widgets`);
const ViewportBody = require(`./viewport-body`);

class EditorCompose extends nkm.datacontrols.Editor {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _PostInit() {
        super._PostInit();
    }

    _Render() {
        super._Render();
        this._viewport = this.Attach(ViewportBody, `viewport`);
        this._forwardData.To(this._viewport, { get: 'body' });
    }

    //TODO: Save document to local storage in raw format
    //With a timestamp
    //When submitting changes, ensure the last modification date is < to local last update


}

module.exports = EditorCompose;