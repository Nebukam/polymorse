'use strict';

const nkm = require(`@nkmjs/core`);
const polymorse = require(`@polymorse/core`);

const PolyMorseDebug = require(`../js-server/polymorse-debug`);

class PolymorseWorkbench extends nkm.app.AppBase {

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