'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);

class DataInterface extends nkm.com.Observable {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext()
        .To(`registryInfos`);

    _Init(){
        super._Init();
    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    async Load() {

    }

    async Save() {

    }

}

module.exports = DataInterface;