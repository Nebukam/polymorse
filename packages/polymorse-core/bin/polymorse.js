'use strict';

const nkm = require(`@nkmjs/core`);

class Polymorse extends nkm.com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._users = {};
        this._content = {};
        
    }

    _CreateUser(p_userInfos){

    }

    _RegisterUser(p_userInfos){
        
    }

}

module.exports = Polymorse;