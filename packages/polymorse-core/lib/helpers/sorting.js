const IDS = require(`../data/ids`);

module.exports = {

    sortPages: function (a, b) { a.header.Get(IDS.TIME_CREATED) - b.header.Get(IDS.TIME_CREATED); },

}