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

                    { key: CTX.SETTINGS_ENTITY, binding: polyData.Settings },
                    { key: CTX.USER_ENTITY, binding: polyData.User },
                    { key: CTX.PAGE_ENTITY, binding: polyData.Page },

                ]
            },
            {
                ctx: nkm.data.CTX.BLOC,
                kvps: [

                    { key: CTX.ENTITY_STATS, binding: polyData.EntityStats },

                    { key: CTX.SETTINGS_BLOC_HEADER, binding: polyData.SettingsHeader },
                    { key: CTX.SETTINGS_BLOC_BODY, binding: polyData.SettingsBody },

                    { key: CTX.USER_BLOC_HEADER, binding: polyData.UserHeader },
                    { key: CTX.USER_BLOC_BODY, binding: polyData.UserBody },

                    { key: CTX.PAGE_BLOC_HEADER, binding: polyData.PageHeader },
                    { key: CTX.PAGE_BLOC_BODY, binding: polyData.PageBody },

                ]
            });

    }

}

module.exports = Bindings;