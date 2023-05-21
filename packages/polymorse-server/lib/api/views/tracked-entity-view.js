'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const polyLinks = require(`../../links/polycore-link`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = nkm.server.operations.AbstractOperation;
class TrackedEntityView extends base {
    constructor() { super(); }

    static __NFO__ = null;
    static __REG__ = null;

    _Init() {
        super._Init();
    }

    get registryLink() {
        let name = this.constructor.__REG__?.name || ``;
        return polyLinks.GetRegistryLink(polyCore.PolyMorse.GetRegistry(name));
    }

    async _InternalExecute(p_params) {

        let
            entityId = p_params.id,
            regLink = this.registryLink,
            entity = await regLink.RequireEntity(entityId);

        if (!entity) {
            this._OnError(nkm.server.STATUSES.NOT_FOUND);
            return null;
        }

        this._output = { entity: polyCore.data.ToObject(entity) };

        return entity;

    }

    async LoadViewedEntity() {
        let rLink = this.registryLink;

    }

    _CleanUp() {
        //Release entity if not in use
        super._CleanUp();
    }



}

module.exports = TrackedEntityView;