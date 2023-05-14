'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);
const polyClient = require(`@polymorse/client`);

class PolymorseWorkbench extends polyClient.Client {

    constructor() { super(); }

    _Init() {

        super._Init();

        this._mainContainer = null;

        this._layers = [
            //{ id: `_mainContainer`, cl: UIItemListLayer }
        ];

    }

    AppDisplay() {
        super.AppDisplay();
    }

}

module.exports = PolymorseWorkbench;