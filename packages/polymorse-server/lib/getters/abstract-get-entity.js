'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.getters.AbstractGetter;
class AbstractGetEntity extends base {
    constructor() { super(); }

    static __NFO__ = null;

    _Init(){
        super._Init();
        this._registry = null;
    }

    _InternalExecute(p_params) {

        let entity = this._registry.Get(p_params.id);
        if (!entity) { return false; }

        Helper.RequireEntity(entity, () => {
            this._response = entity.Serialize();
            this._OnSuccess();
        });

    }

    

}

module.exports = AbstractGetEntity;