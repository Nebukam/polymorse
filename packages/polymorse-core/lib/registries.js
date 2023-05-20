const CTX = require(`./context`);

const REGISTRIES = {};

REGISTRIES.SETTINGS = {
    name:Object.freeze('settings'),
    ctx:CTX.SETTINGS_ENTITY
};

REGISTRIES.USERS = {
    name:Object.freeze('users'),
    ctx:CTX.USER_ENTITY
};

REGISTRIES.PAGES = {
    name:Object.freeze('pages'),
    ctx:CTX.PAGE_ENTITY
};

REGISTRIES.DRAFTS = {
    name:Object.freeze('drafts'),
    ctx:CTX.PAGE_ENTITY
};

module.exports = REGISTRIES;