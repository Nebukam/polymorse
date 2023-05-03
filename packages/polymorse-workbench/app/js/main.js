'use strict';

const nkm = require(`@nkmjs/core`);
const polymorse = require(`@polymorse/core`);

const PolyMorseDebug = require(`@polymorse/core/lib/polymorse-debug`);

class PolymorseWorkbench extends nkm.app.AppBase {

    constructor() { super(); }

    _Init() {

        super._Init();

        this._mainContainer = null;

        PolyMorseDebug.GenerateDebugData(`D:\\GIT\\polymorse\\packages\\polymorse-workbench\\database`, true);

        this._layers = [
            //{ id: `_mainContainer`, cl: UIItemListLayer }
        ];

    }

    AppDisplay() {
        super.AppDisplay();
    }

}

module.exports = PolymorseWorkbench;