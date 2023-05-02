const { ipcMain } = require('electron');
const path = require('path');
const electron = require(`@nkmjs/core/electron`);

class ElectronProcess extends electron.core.ElectronBase {
    constructor(p_config) { super(p_config); }

    _Boot() {

        if (this._booted) { return; }

        super._Boot();

    }

}

module.exports = ElectronProcess;