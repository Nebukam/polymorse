'use strict';

const nkm = require(`@nkmjs/core`);

const base = require(`./data-interface`);
class EntityBlockInterface extends base {
    constructor() { super(); }

    static __distribute = nkm.com.helpers.OptionsDistribute.Ext(base)
        .To(`drawGuides`);
        
}

module.exports = EntityBlockInterface;