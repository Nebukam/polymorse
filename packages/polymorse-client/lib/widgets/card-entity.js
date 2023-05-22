'use strict';

const nkm = require(`@nkmjs/core`);

const TPLEntityCard = require(`./templates/tpl-card-entity`);

const base = nkm.datacontrols.ControlWidget;
class EntityCard extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._showAuthor = false;
    }

    get showAuthor() { return this._showAuthor; }
    set showAuthor(p_value) {
        if (this._showAuthor == p_value) { return; }
        this._showAuthor = p_value;

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
        nkm.ui.DOMTemplate.Render(TPLEntityCard, this, {
            [nkm.ui.IDS.OWNER]: this,
        });
    }

    _CleanUp() {
        this.showAuthor = false;
        super._CleanUp();
    }

}

module.exports = EntityCard;