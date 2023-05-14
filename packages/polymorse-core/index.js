
'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

nkm.com.BINDINGS.Expand(require(`./bindings`));
const __POLYMORSE = require(`./lib/polymorse`);

module.exports = {

    LOCALES: require(`./lib/locales`),
    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),

    PolyMorse: __POLYMORSE,
    api: require(`./lib/api`),
    helpers: require(`./lib/helpers`),
    data: require(`./lib/data`),

    CreateUser: (p_uid) => { return __POLYMORSE.RegisterUser(p_uid); },
    CreatePage: (p_uid) => { return __POLYMORSE.RegisterPage(p_uid); },

    GetUser: (p_uid) => { return __POLYMORSE.userRegistry.Get(p_uid); },
    GetPage: (p_uid) => { return __POLYMORSE.pageRegistry.Get(p_uid); },

}
