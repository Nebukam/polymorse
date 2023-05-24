'use strict';

const nkm = require(`@nkmjs/core`);

const base = nkm.datacontrols.ControlWidget;
class EntityCard extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._showAuthor = false;
    }

    static _Style() {
        return nkm.style.Extends({
            ':host': {
                'min-height': 'auto',
                'display': 'grid',
                'padding-bottom': '5px',
                'margin-bottom': '5px',
                'background-color':'#000000',
            },
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._userCard = this.Attach(require(`./header-user-card`), `user`);
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = EntityCard;