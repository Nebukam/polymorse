'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const io = nkm.io;

const IDS = require(`./ids`);

const base = require(`./abstract-entity-block`);
class AbstractBody extends base {
    constructor() { super(); }

    static __NFO__ = nkm.com.NFOS.Ext({
        [nkm.com.IDS.UID]: `@polymorse:abstract-body`
    }, base);

    static __DATALISTS = {
        [IDS.CONTENT_BLOCKS]: {
            autoSort: (a, b) => { return a.Get(IDS.ORDER) - b.Get(IDS.ORDER) },
            flush: nkm.data.DataList.FLUSH_DIRECT_RELEASE
        },
    };

    _Init() {
        super._Init();
        this._blocMap = {};
    }

    get blocks() { return this._blocks; }

    CreateBlock(p_uid, p_class) {
        //TODO: Make sure there is no duplicate name?
        let newBlock = nkm.com.Rent(p_class);
        newBlock.uuid = p_uid;
        this._blocMap[p_uid] = newBlock;
        this._blocks.Add(newBlock);
        return newBlock;
    }

    RemoveBlock(p_block) {
        this._blocks.Remove(p_block);
    }

    _CleanUp() {
        for (const id of Object.keys(this._blocMap)) { delete this._blocMap[id]; }
        super._CleanUp();
    }


}

module.exports = AbstractBody;