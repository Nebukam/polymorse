'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const Helper = require(`../helper`);
/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-get-entity`);
class GetUser extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.routes.getUser;

    _Init() {
        super._Init();
        this._registry = polyCore.PolyMorse.userRegistry;
    }

}

module.exports = GetUser;