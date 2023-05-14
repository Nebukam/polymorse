'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

module.exports = {

    Get: function (p_api, p_params, p_callback) {
        fetch(`${nkm.main.baseURL}${nkm.com.NFOS.GetRoute(`/get`, p_api, p_params)}`, {})
            .then((p_res) => {
                if (!p_res.ok) { p_callback(p_res, null); }
                else {
                    let contentType = p_res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        p_res.json().then(data => { p_callback(null, data); });
                    } else {
                        p_res.text().then(text => { p_callback(null, text); });
                    }
                }
            });
    },

    Do: function (p_options, p_callback) {
        fetch(`${nkm.main.baseURL}/polymorse/v1/action`, p_options)
            .then((p_res) => {
                if (!p_res.ok) { p_callback(p_res, null); }
                else { p_callback(null, p_res.json()); }
            });
    }

}