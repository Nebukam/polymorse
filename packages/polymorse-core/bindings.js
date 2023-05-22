'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./lib/data`);
const CTX = require(`./lib/context`);

class Bindings extends nkm.com.helpers.BindingKit {
    constructor() { super(); }

    _Init() {
        super._Init();

        this.Add(
            {
                ctx: CTX.ENTITIES,
                kvps: [

                    { key: CTX.SETTINGS_ENTITY, binding: polyData.settings.Entity },
                    { key: CTX.USER_ENTITY, binding: polyData.user.Entity },
                    { key: CTX.PAGE_ENTITY, binding: polyData.page.Entity },

                ]
            },
            {
                ctx: nkm.data.CTX.BLOC,
                kvps: [

                    { key: CTX.ENTITY_STATS, binding: polyData.EntityStats },

                    { key: CTX.SETTINGS_BLOC_HEADER, binding: polyData.settings.Header },
                    { key: CTX.SETTINGS_BLOC_BODY, binding: polyData.settings.Body },

                    { key: CTX.USER_BLOC_HEADER, binding: polyData.user.Header },
                    { key: CTX.USER_BLOC_BODY, binding: polyData.user.Body },

                    { key: CTX.PAGE_BLOC_HEADER, binding: polyData.page.Header },
                    { key: CTX.PAGE_BLOC_BODY, binding: polyData.page.Body },

                ]
            });

    }

}

module.exports = Bindings;