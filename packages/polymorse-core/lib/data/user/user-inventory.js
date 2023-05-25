'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const helpers = require(`../../helpers`);
const IDS = require(`../ids`);

const base = require(`../abstract-header`);
class UserInventory extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user-body`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.LIST_DRAFTS]: { value: [] },
        [IDS.LIST_PUBLISHED]: { value: [] },
    });

    static __DATALISTS = {
        [_id_pageIds]: {
            [nkm.data.IDS.SKIP_S11N]: true,
            autoSort: helpers.sorting.sortPages,
            watch: [
                { signal: nkm.com.SIGNAL.ITEM_ADDED, fn: (p_list, p_item) => { this._AddToManifest(IDS.LIST_PUBLISHED, p_item); } },
                { signal: nkm.com.SIGNAL.ITEM_REMOVED, fn: (p_list, p_item) => { this._RemoveFromManifest(IDS.LIST_PUBLISHED, p_item); } }
            ]
        },
        [_id_draftIds]: {
            [nkm.data.IDS.SKIP_S11N]: true,
            autoSort: helpers.sorting.sortPages,
            watch: [
                { signal: nkm.com.SIGNAL.ITEM_ADDED, fn: (p_list, p_item) => { this._AddToManifest(IDS.LIST_DRAFTS, p_item); } },
                { signal: nkm.com.SIGNAL.ITEM_REMOVED, fn: (p_list, p_item) => { this._RemoveFromManifest(IDS.LIST_DRAFTS, p_item); } }
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
            manifest = this.Get(p_manifestId),
            index = manifest.indexOf(p_item.uuid);

        if (index == -1) { manifest.push(p_item.uuid); }
    }

    _RemoveFromManifest(p_manifestId, p_item) {
        let
            manifest = this.Get(p_manifestId),
            index = manifest.indexOf(p_item.uuid);
        manifest.splice(index, 1);
    }

}

module.exports = nkm.data.Register(UserInventory);