'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);
const SIGNAL = require(`../signal`);

const base = require(`./content-header`);
class PageHeader extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:page-header`,
    }, base);

    static __VALUES = this.Ext(base.__VALUES, {
        [IDS.CLEARANCE]: { value: 0 },
        [IDS.OWNER_ID]: { value: `` },
        [IDS.CONTENT_CATEGORY]: { value: `` },
        [IDS.CONTENT_TAGS]: { value: [] },
    });

    _Init() {
        super._Init();
        this._state = null;
    }

    get state() { return this._state; }
    set state(p_value) {
        if (this._state == p_value) { return; }
        let oldState = this._state;
        this._state = p_value;
        this.Broadcast(SIGNAL.STATE_CHANGED, this, this._state, oldState);
    }

    CommitValueUpdate(p_id, p_newValue, p_oldValue, p_silent = false) {
        super.CommitValueUpdate(p_id, p_newValue, p_oldValue, p_silent);
        switch (p_id) {
            case IDS.OWNER_ID:
                // Retrieve owner and register this entity as owned in memory
                break;
        }
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = nkm.data.SIMPLEX.Export(PageHeader);