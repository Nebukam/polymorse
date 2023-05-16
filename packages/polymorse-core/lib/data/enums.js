const nkm = require(`@nkmjs/core/nkmin`);

const ENUMS = {};

//#region Text types

ENUMS.TEXT_TYPE_PLAIN = Object.freeze(`textPlain`);
ENUMS.TEXT_TYPE_CODE = Object.freeze(`textCode`);
ENUMS.TEXT_TYPE_MARKDOWN = Object.freeze(`textMarkdown`);

ENUMS.TEXT_TYPES = nkm.data.catalogs.CreateFrom({ name: `Text types`, autoSort: false }, [
    { name: `Plain text`, [nkm.com.IDS.VALUE]: ENUMS.TEXT_TYPE_PLAIN, icon: 'text' },
    { name: `Code`, [nkm.com.IDS.VALUE]: ENUMS.TEXT_TYPE_CODE, icon: 'text' },
    { name: `Markdown`, [nkm.com.IDS.VALUE]: ENUMS.TEXT_TYPE_MARKDOWN, icon: 'text' },
]);

//#endregion

module.exports = ENUMS;