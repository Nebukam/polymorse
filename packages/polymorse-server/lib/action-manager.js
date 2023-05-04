'use strict';

const nkm = require(`@nkmjs/core/nkmin`);
const polyData = require(`./data`);

class ActionManager extends nkm.com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._actions = {};
    }

    /**
     * 
     * @param {Object} p_actionMap { action:actionClass }
     */
    _RegisterActions(p_actionMap) {
        for (let id in p_actionMap) {
            this._actions[id] = new p_actionMap[id]();
        }
    }

    static Execute(p_params) {
        try {
            let action = this.instance._actions[p_params.action];
            return action.Execute(p_params.data);
        } catch (e) {
            return false;
        }
    }

}

module.exports = ActionManager;