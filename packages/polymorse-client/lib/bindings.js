'use strict';

const nkm = require("@nkmjs/core");
const polyCore = require(`@polymorse/core`);

const editors = require(`./editors`);

class Bindings extends nkm.com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                ctx: nkm.datacontrols.CTX.CONTROLLER,
                kvps: [
                    { key: polyCore.data.blocks.Code, binding: editors.entity.widgets.blocks.Code },
                    { key: polyCore.data.blocks.Text, binding: editors.entity.widgets.blocks.Text },
                    { key: polyCore.data.blocks.Image, binding: editors.entity.widgets.blocks.Image },
                    { key: polyCore.data.blocks.Embed, binding: editors.entity.widgets.blocks.Embed }
                ]
            });

    }
}

module.exports = Bindings;