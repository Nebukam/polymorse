'use strict';

const nkm = require(`@nkmjs/core`);

const base = require(`./data-interface`);
class EntityInterface extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`registryInfos`);

    _Init() {
        super._Init();
        this._registry = null;
    }

    set registryInfos(p_value) {
        let registry = polyCore.PolyMorse.GetRegistry(p_value.name);
        this.registry = registry;
    }

    get registry() { return this._registry; }
    set registry(p_value) {
        this._registry = p_value;
    }

    _CleanUp(){
        this.registry = null;
        super._CleanUp();
    }

}

module.exports = EntityInterface;