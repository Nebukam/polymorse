'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@polymorse/core`);

const base = nkm.datacontrols.ControlWidget;
class HeaderUserCard extends base {
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
                'grid-template-columns': `50px auto`,
                'grid-template-rows': 'auto',
                'grid-template-areas': '"thumb content" "thumb footer"',
                'flex-flow': 'column nowrap',
                'padding-bottom': '5px',
                'margin-bottom': '5px',
            },
            '.area-thumb': { 'grid-area': 'thumb' },
            '.area-content': { 'grid-area': 'content' },
            '.area-footer': { 'grid-area': 'footer' },
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._title = new nkm.ui.manipulators.Text(nkm.ui.El(`span`, {class:'title'}, this._host));
    }

    _OnDataUpdated(p_data){
        super._OnDataChanged(p_data);
        this._title.Set(p_data.Get(polyCore.data.IDS.NAME));
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = HeaderUserCard;