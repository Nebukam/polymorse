'use strict';

const nkm = require(`@nkmjs/core`);

const _id_thumb = `thumb`;
const _id_title = `title`;
const _id_subtitle = `subtitle`;

class TPLEntityCard extends nkm.ui.DOMTemplate {
    constructor() { super(); }
    static _CreateTemplate() {

        this._Add(ui.dom.El(`img`, { class: `${_id_thumb} area-thumb` }), { [ui.IDS.UID]: _id_thumb });
        this._Add(ui.dom.El(`span`, { class: `${_id_title} area-content` }), {
            [ui.IDS.UID]: _id_title,
            fn: (node, opts, customOpts) => { return this.AsTextStatic(node, opts, customOpts); }
        });
        this._Add(ui.dom.El(`span`, { class: `${_id_subtitle} area-content` }), {
            [ui.IDS.UID]: _id_subtitle,
            fn: (node, opts, customOpts) => { return this.AsTextStatic(node, opts, customOpts); }
        });
    }
}

module.exports = TPLEntityCard;