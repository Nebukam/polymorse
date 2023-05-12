'use strict';

const nkm = require("@nkmjs/core/nkmin");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class ENTITIES extends nkm.com.helpers.CSYMBOL { constructor() { super(); } }

class ENTITY_SETTINGS extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_SETTINGS_HEADER extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_SETTINGS_BODY extends nkm.com.helpers.CKEY { constructor() { super(); } }

class ENTITY_USER extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_USER_HEADER extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_USER_BODY extends nkm.com.helpers.CKEY { constructor() { super(); } }

class ENTITY_PAGE extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_PAGE_HEADER extends nkm.com.helpers.CKEY { constructor() { super(); } }
class ENTITY_PAGE_BODY extends nkm.com.helpers.CKEY { constructor() { super(); } }

module.exports = {
    ENTITIES: ENTITIES,

    ENTITY_SETTINGS: ENTITY_SETTINGS,
    ENTITY_SETTINGS_HEADER: ENTITY_SETTINGS_HEADER,
    ENTITY_SETTINGS_BODY: ENTITY_SETTINGS_BODY,

    ENTITY_USER: ENTITY_USER,
    ENTITY_USER_HEADER: ENTITY_USER_HEADER,
    ENTITY_USER_BODY: ENTITY_USER_BODY,

    ENTITY_PAGE: ENTITY_PAGE,
    ENTITY_PAGE_HEADER: ENTITY_PAGE_HEADER,
    ENTITY_PAGE_BODY: ENTITY_PAGE_BODY

};