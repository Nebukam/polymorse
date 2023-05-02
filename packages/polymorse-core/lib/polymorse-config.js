'use strict';

const nkm = require(`@nkmjs/core`);
const u = nkm.u;

const fs = require(`fs`);
const path = require(`path`);

class PolyMorseConfig {
    constructor(p_path) {

        this.__raw = null;
        this._keys = new nkm.com.helpers.Keys();

        try{
            this.__raw = JSON.parse(fs.readFileSync(p_path));
        }catch(e){
            throw e;
        }


    }

}

module.exports = PolyMorseConfig;