'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const links = require(`../../links`);
/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./get-entity-user`);
class GetCurrentUser extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.ops.getCurrentUser;

    async _InternalExecute(p_params) {

        let
            regLink = links.PolycoreLink.GetRegistryLink(this._registry),
            entity = await regLink.RequireEntity(this._handler.user.uuid);

        if (!entity) { 
            this._OnError(nkm.server.STATUSES.NOT_FOUND); 
            return;
        }

        this._output = entity.Serialize();
        this._OnSuccess();

    }

}

module.exports = GetCurrentUser;