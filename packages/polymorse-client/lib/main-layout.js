'use strict';

const nkm = require(`@nkmjs/core`);

const base = nkm.app.SingleViewLayer;
class MainLayout extends base {
    constructor() { super(); }

    static _Style() {
        return nkm.style.Extends({
            ':host': {
                'min-height': 'auto',
                //'display': 'grid',
            },
            '.header':{
                'width':'100%',
                'position':'absolute',
                'top':''
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._header = this.Attach(require(`./widgets/header-main`), `header`);
    }


    get header() { return this._header; }



}

module.exports = MainLayout;