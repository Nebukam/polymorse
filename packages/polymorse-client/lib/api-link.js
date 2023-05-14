'use strict';

const nkm = require(`@nkmjs/core`);
const polyCore = require(`@nkmjs/core`);

module.exports = {

    Get: function (p_options, p_callback) {
        fetch(`${nkm.main.baseUrl}/polymorse/v1/get`, p_options)
            .then((p_res) => {
                if (!p_res.ok) { p_callback(p_res, null); }
                else { p_callback(null, p_res.json()); }
            });
    },

    Do: function (p_options, p_callback) {
        fetch(`${nkm.main.baseUrl}/polymorse/v1/action`, p_options)
        .then((p_res) => {
            if (!p_res.ok) { p_callback(p_res, null); }
            else { p_callback(null, p_res.json()); }
        });
    }

}