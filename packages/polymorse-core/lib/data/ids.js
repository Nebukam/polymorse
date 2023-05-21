'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
const IDS = {};

//#region Documents

IDS.UUID = Object.freeze(`uuid`);
IDS.CLEARANCE = Object.freeze(`clearance`);

nkm.data.RegisterDescriptors({

    [IDS.UUID]: {
        valueType: nkm.data.TYPES.STRING,
        label: `UUID`,
        desc: `Universal Unique Identifier`
    },

    [IDS.CLEARANCE]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Clearance`,
        desc: `Clearance required to see the content`
    },

});

//#endregion

//#region Content

IDS.OWNER_ID = Object.freeze(`authorId`);

IDS.HEADER = Object.freeze(`header`);

IDS.CONTENT = Object.freeze(`content`);
IDS.CONTENT_CATEGORY = Object.freeze(`contentCategory`);
IDS.CONTENT_TAGS = Object.freeze(`contentTags`);
IDS.CONTENT_BLOCKS = Object.freeze(`blocks`);

IDS.ORDER = Object.freeze(`order`);
IDS.BLOCK_TYPE = Object.freeze(`blockType`);

IDS.TIME_CREATED = Object.freeze(`created`);
IDS.TIME_LAST_EDITED = Object.freeze(`edited`);
IDS.TIME_LAST_PUBLISHED = Object.freeze(`published`);

nkm.data.RegisterDescriptors({

    [IDS.OWNER_ID]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Owner ID`,
        desc: `The content' owner identifier`
    },

    [IDS.HEADER]: {
        label: `Header`,
        desc: `Morse Header`
    },

    [IDS.CONTENT]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Content`,
        desc: `...`
    },

    [IDS.CONTENT_TAGS]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Tags`,
        desc: `...`
    },

    [IDS.CONTENT_BLOCKS]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Children`,
        desc: `...`
    },

    [IDS.CONTENT_CATEGORY]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Category`,
        desc: `...`
    },

    [IDS.ORDER]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Order`,
        desc: `...`
    },

    [IDS.BLOCK_TYPE]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Type`,
        desc: `...`
    },

    [IDS.TIME_CREATED]: {
        valueType: nkm.data.TYPES.NUMBER,
        label: `Creation date`,
        desc: `...`
    },

    [IDS.TIME_LAST_PUBLISHED]: {
        valueType: nkm.data.TYPES.NUMBER,
        label: `Last publishing date`,
        desc: `...`
    },

    [IDS.TIME_LAST_EDITED]: {
        valueType: nkm.data.TYPES.NUMBER,
        label: `Last editing date`,
        desc: `...`
    },

});

//#endregion

//#region User

IDS.NAME = Object.freeze(`name`);
IDS.PRONOUNS = Object.freeze(`pronouns`);

IDS.IDENTITY = Object.freeze(`identity`);
IDS.BOOKMARKS = Object.freeze(`bookmarks`);
IDS.LIKES = Object.freeze(`likes`);

//#endregion

//#region Documents

IDS.TIME_INIT_DATE = Object.freeze(`initTime`);

nkm.data.RegisterDescriptors({

    [IDS.TIME_INIT_DATE]: {
        valueType: nkm.data.TYPES.NUMBER,
        label: `Initialization date`,
        desc: `Universal Unique Identifier`
    },

});

//#endregion

//#region Generic properties

IDS.PARENT_UUID = Object.freeze(`puuid`);
IDS.TITLE = Object.freeze(`title`);
IDS.DESCRIPTION = Object.freeze(`description`);
IDS.SUMMARY = Object.freeze(`summary`);
IDS.COVER = Object.freeze(`cover`);

IDS.JSON = Object.freeze(`json`);

nkm.data.RegisterDescriptors({

    [IDS.PARENT_UUID]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Parent UUID`,
        desc: `Parent`
    },

    [IDS.TITLE]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Title`,
        desc: `Title`
    },

    [IDS.DESCRIPTION]: {
        valueType: nkm.data.TYPES.STRING,
        label: `Description`,
        desc: `Content description`
    },

    [IDS.JSON]: {
        serialize: (p_value, p_def, p_data) => { return JSON.stringify(p_value); },
        deserialize: (p_value, p_def, p_data) => { return JSON.parse(p_value); }
    },

});

//#endregion

//#region Bloc ids

IDS.BLOC_BODY = Object.freeze(`body`);
IDS.BLOC_HEADER = Object.freeze(`header`);
IDS.BLOC_STATS = Object.freeze(`stats`);

//#endregion

module.exports = IDS;