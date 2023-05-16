'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);

class ViewportBody extends nkm.datacontrols.ControlView {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._dataObserver
            .Hook(com.SIGNAL.UPDATED, this._OnDataUpdated, this);

        this._dataListHandler = new nkm.datacontrols.helpers.DataListHandler(this);
        this.forwardEditor.To(this._dataListHandler);
        this.forwardContext.To(this._dataListHandler);
        this.forwardData.To(this._dataListHandler, { get: polyCore.IDS.CONTENT_BLOCKS, set: `dataList` });

    }
    //First add static blocs editors

    //Then add datalist blocks editors

    _Render() {
        super._Render();

    }

}

module.exports = ViewportBody;