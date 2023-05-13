'use strict';

module.exports = {

    STATE_CHANGED: Symbol(`stateChanged`),

    ENTITY_CREATED: Symbol(`entityCreated`),

    REQUEST_LOAD: Symbol(`requestLoad`),
    LOADED: Symbol(`loaded`),

    REQUEST_SAVE: Symbol(`requestSave`),
    SAVED: Symbol(`saved`),

    HEADER_VALUE_CHANGED:Symbol(`headerValueChanged`),
    BODY_VALUE_CHANGED:Symbol(`bodyValueChanged`),

}