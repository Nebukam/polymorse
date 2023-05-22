
'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

module.exports = {

    IDS: require(`./ids`),

    blocks: require(`./blocks`),

    EntityStats: require(`./entity-stats`),

    user: require(`./user`),
    page: require(`./page`),
    settings: require(`./settings`),

    Registry: require(`./registry`),

    ToObject: function (p_data) {

        let
            object = {},
            NFOS = nkm.com.NFOS.Get(p_data),
            VALUES = p_data.DEFINITIONS,
            BLOCS = p_data.BLOCS,
            DATALISTS = p_data.DATALISTS;

        if (NFOS.view) { object.view = NFOS.view; }

        if (VALUES) {
            let values = {};
            for (let id in VALUES) {
                let def = VALUES[id];
                values[id] = p_data.Get(id);
            }
            object.values = values;
        }

        if (BLOCS) {
            let blocs = {};
            for (let id in BLOCS) {
                let def = BLOCS[id];
                blocs[id] = module.exports.ToObject(nkm.data.SIMPLEX.GetBloc(p_data, id));
            }
            object.blocs = blocs;
        }

        if (DATALISTS) {
            let datalists = {};
            for (let id in DATALISTS) {
                let def = DATALISTS[id],
                    dlist = nkm.data.SIMPLEX.GetList(p_data, id),
                    list = [];
                dlist.ForEach(el => { list.push(module.exports.ToObject(el)) });
                datalists[id] = list;
            }
            object.datalists = datalists;
        }

        return object;

    },

}