'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const ENUMS = require(`../enums`);
const IDS = {};


//#region Text properties

IDS.TEXT_TYPE = Object.freeze(`textType`);

nkm.data.RegisterDescriptors({

    [IDS.TEXT_TYPE]: {
        valueType: nkm.data.TYPES.ENUM,
        enum: ENUMS.TEXT_TYPES,
        label: `Content type`,
        inputOptions: { catalog: ENUMS.TEXT_TYPES, itemKey: nkm.com.IDS.VALUE },
        desc: `Type of text`,
    },

});

//#endregion



module.exports = IDS;
