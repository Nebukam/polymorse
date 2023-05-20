'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

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
        let entity = this._registry
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