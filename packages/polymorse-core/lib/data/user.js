'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CONTEXT = require(`../context`);

const sortPages = (a, b) => { a.header.Get(IDS.TIME_CREATED) - b.header.Get(IDS.TIME_CREATED); }

const _id_pageIds = `pages-ids`;
const _id_draftIds = `drafts-ids`;

const base = require(`./abstract-entity`);
class User extends base {
    constructor() { super(); }

    static __headerKey = CONTEXT.ENTITY_USER_HEADER;
    static __bodyKey = CONTEXT.ENTITY_USER_BODY;

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:user`
    }, base);

    _Init() {
        super._Init();

        this._pages = new nkm.data.helpers.DataList();
        this._pages.autoSort = sortPages;
        this._pages
            .Watch(nkm.com.SIGNAL.ITEM_ADDED, (p_list, p_item) => {
                this._AddToManifest(_id_pageIds, p_item);
            })
            .Watch(nkm.com.SIGNAL.ITEM_REMOVED, (p_list, p_item) => {
                this._RemoveFromManifest(_id_pageIds, p_item);
            });

        this._drafts = new nkm.data.helpers.DataList();
        this._drafts.autoSort = sortPages;
        this._drafts
            .Watch(nkm.com.SIGNAL.ITEM_ADDED, (p_list, p_item) => {
                this._AddToManifest(_id_draftIds, p_item);
            })
            .Watch(nkm.com.SIGNAL.ITEM_REMOVED, (p_list, p_item) => {
                this._RemoveFromManifest(_id_draftIds, p_item);
            });

    }

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

    get drafts() { return this._drafts; }
    get pages() { return this._pages; }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = User;
nkm.com.BINDINGS.RegisterFromNFO(User);