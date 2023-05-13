'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const CONTEXT = require(`../context`);

const sortPages = (a, b) => { a.header.Get(IDS.TIME_CREATED) - b.header.Get(IDS.TIME_CREATED); }

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
        this._pages.Watch(nkm.com.SIGNAL.ITEM_ADDED, (p_item) => {
            //console.log(`Page aded to ${this.uuid}`);
        });

        this._drafts = new nkm.data.helpers.DataList();
        this._drafts.autoSort = sortPages;
        this._drafts.Watch(nkm.com.SIGNAL.ITEM_ADDED, (p_item) => {
            //console.log(`Draft added to ${this.uuid}`);
        });

    }

    get drafts() { return this._drafts; }
    get pages() { return this._pages; }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = User;
nkm.com.BINDINGS.RegisterFromNFO(User);