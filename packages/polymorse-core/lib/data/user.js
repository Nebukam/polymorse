'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CTX = require(`../context`);

const sortPages = (a, b) => { a.header.Get(IDS.TIME_CREATED) - b.header.Get(IDS.TIME_CREATED); }

const _id_pageIds = `pages-ids`;
const _id_draftIds = `drafts-ids`;

const base = require(`./abstract-entity`);
class User extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user`
    }, base);

    static __BLOCS = base.Ext(base.__BLOCS, {
        [IDS.BLOC_HEADER]: { type: CTX.USER_BLOC_HEADER },
        [IDS.BLOC_BODY]: { type: CTX.USER_BLOC_BODY },
    });

    static __DATALISTS = {
        [_id_pageIds]: {
            [nkm.data.IDS.SKIP_S11N]: true,
            autoSort: sortPages,
            watch: [
                { signal: nkm.com.SIGNAL.ITEM_ADDED, fn: (p_list, p_item) => { this._AddToManifest(_id_pageIds, p_item); } },
                { signal: nkm.com.SIGNAL.ITEM_REMOVED, fn: (p_list, p_item) => { this._RemoveFromManifest(_id_pageIds, p_item); } }
            ]
        },
        [_id_draftIds]: {
            [nkm.data.IDS.SKIP_S11N]: true,
            autoSort: sortPages,
            watch: [
                { signal: nkm.com.SIGNAL.ITEM_ADDED, fn: (p_list, p_item) => { this._AddToManifest(_id_draftIds, p_item); } },
                { signal: nkm.com.SIGNAL.ITEM_REMOVED, fn: (p_list, p_item) => { this._RemoveFromManifest(_id_draftIds, p_item); } }
            ]
        },
    };

    _Init() {
        super._Init();
    }

    get drafts() { return this._drafts; }
    get pages() { return this._pages; }

    _AddToManifest(p_manifestId, p_item) {
        let
            manifest = this.header.metadata.GetOrSet(p_manifestId, []),
            index = manifest.indexOf(p_item.uuid);

        if (index == -1) { manifest.push(p_item.uuid); }
    }

    _RemoveFromManifest(p_manifestId, p_item) {
        let
            manifest = this.header.metadata.GetOrSet(p_manifestId, []),
            index = manifest.indexOf(p_item.uuid);
        manifest.splice(index, 1);
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = nkm.data.SIMPLEX.Export(User);