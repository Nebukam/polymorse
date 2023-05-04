'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class IDS {
    constructor() { }

    //#region Documents
    
    static UUID = Object.freeze(`uuid`);
    static CLEARANCE = Object.freeze(`clearance`);

    static {
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
    }

    //#endregion

    //#region Content

    static OWNER_ID = Object.freeze(`authorId`);

    static HEADER = Object.freeze(`header`);

    static CONTENT = Object.freeze(`content`);
    static CONTENT_TAGS = Object.freeze(`contentTags`);
    static CONTENT_BLOCKS = Object.freeze(`blocks`);

    static ORDER = Object.freeze(`order`);
    static BLOCK_TYPE = Object.freeze(`blockType`);

    static DATE_CREATED = Object.freeze(`created`);
    static LAST_PUBLISHED = Object.freeze(`published`);
    static LAST_EDITED = Object.freeze(`edited`);

    static {
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

            [IDS.DATE_CREATED]: {
                valueType: nkm.data.TYPES.STRING,
                label: `Creation date`,
                desc: `...`
            },

            [IDS.LAST_PUBLISHED]: {
                valueType: nkm.data.TYPES.STRING,
                label: `Last publishing date`,
                desc: `...`
            },

            [IDS.LAST_EDITED]: {
                valueType: nkm.data.TYPES.STRING,
                label: `Last editing date`,
                desc: `...`
            },

        });
    }

    //#endregion



}

//#region descriptors



//#endregion

module.exports = IDS;