'use strict';

const nkm = require("@nkmjs/core/nkmin");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */

class ENTITIES extends nkm.com.CSYMBOL { constructor() { super(); } }

class ENTITY extends nkm.com.CKEY { constructor() { super(); } }
class ENTITY_STATS extends nkm.com.CKEY { constructor() { super(); } }

class SETTINGS_ENTITY extends ENTITY { constructor() { super(); } }
class SETTINGS_BLOC_HEADER extends nkm.com.CKEY { constructor() { super(); } }
class SETTINGS_BLOC_BODY extends nkm.com.CKEY { constructor() { super(); } }

class USER_ENTITY extends ENTITY { constructor() { super(); } }
class USER_BLOC_HEADER extends nkm.com.CKEY { constructor() { super(); } }
class USER_BLOC_BODY extends nkm.com.CKEY { constructor() { super(); } }
class USER_BLOC_INVENTORY extends nkm.com.CKEY { constructor() { super(); } }

class PAGE_ENTITY extends ENTITY { constructor() { super(); } }
class PAGE_BLOC_HEADER extends nkm.com.CKEY { constructor() { super(); } }
class PAGE_BLOC_BODY extends nkm.com.CKEY { constructor() { super(); } }


module.exports = {
    
    ENTITIES: ENTITIES,
    ENTITY:ENTITY,

    ENTITY_STATS: ENTITY_STATS,

    SETTINGS_ENTITY: SETTINGS_ENTITY,
    SETTINGS_BLOC_HEADER: SETTINGS_BLOC_HEADER,
    SETTINGS_BLOC_BODY: SETTINGS_BLOC_BODY,

    USER_ENTITY: USER_ENTITY,
    USER_BLOC_HEADER: USER_BLOC_HEADER,
    USER_BLOC_BODY: USER_BLOC_BODY,
    USER_BLOC_INVENTORY:USER_BLOC_INVENTORY,

    PAGE_ENTITY: PAGE_ENTITY,
    PAGE_BLOC_HEADER: PAGE_BLOC_HEADER,
    PAGE_BLOC_BODY: PAGE_BLOC_BODY

};