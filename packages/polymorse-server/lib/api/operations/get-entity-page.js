'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetPage extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.ops.getPage;

    _Init() {
        super._Init();
        this._registry = polyCore.PolyMorse.pageRegistry;
    }

}

module.exports = GetPage;