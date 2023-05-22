'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const links = require(`../../links`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class AbstractGetEntity extends base {
    constructor() { super(); }

    static __NFO__ = null;

    _Init() {
        super._Init();
        this._registry = null;
    }

    async _InternalExecute(p_params) {

        let
            regLink = links.PolycoreLink.GetRegistryLink(this._registry),
            entity = await regLink.RequireEntity(p_params.id);

        if (!entity) { 
            this._OnError(nkm.server.STATUSES.NOT_FOUND); 
            return;
        }

        this._output = entity.Serialize();
        this._OnSuccess();

    }

}

module.exports = AbstractGetEntity;