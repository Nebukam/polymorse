
'use strict';

const __POLYMORSE = require(`./lib/polymorse`);

module.exports = {

    LOCALES: require(`./lib/locales`),
    SIGNAL: require(`./lib/signal`),
    FLAGS: require(`./lib/flags`),

    PolyMorse: __POLYMORSE,

    CreateUser: (p_uid) => { return __POLYMORSE.CreateUser(p_uid); },
    CreatePage: (p_uid) => { return __POLYMORSE.CreatePage(p_uid); },

    GetUser: (p_uid) => { return __POLYMORSE.userRegistry.Get(p_uid); },
    GetPage: (p_uid) => { return __POLYMORSE.pageRegistry.Get(p_uid); },

}