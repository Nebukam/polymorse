'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./lib/data`);
const CONTEXT = require(`./lib/context`);

class Bindings extends nkm.com.helpers.BindingKit {
    constructor() { super(); }

    _Init() {
        super._Init();

        this.Add(
            {
                context: CONTEXT.ENTITIES,
                kvps: [

                    { key: CONTEXT.ENTITY_SETTINGS, binding: polyData.Settings },
                    { key: CONTEXT.ENTITY_SETTINGS_HEADER, binding: polyData.SettingsHeader },
                    { key: CONTEXT.ENTITY_SETTINGS_BODY, binding: polyData.SettingsBody },

                    { key: CONTEXT.ENTITY_USER, binding: polyData.User },
                    { key: CONTEXT.ENTITY_USER_HEADER, binding: polyData.UserHeader },
                    { key: CONTEXT.ENTITY_USER_BODY, binding: polyData.UserBody },

                    { key: CONTEXT.ENTITY_PAGE, binding: polyData.Page },
                    { key: CONTEXT.ENTITY_PAGE_HEADER, binding: polyData.PageHeader },
                    { key: CONTEXT.ENTITY_PAGE_BODY, binding: polyData.PageBody },

                ]
            });

    }

}

module.exports = Bindings;