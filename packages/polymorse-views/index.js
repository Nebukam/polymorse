
'use strict';

const path = require(`path`);

module.exports = {
    GetPaths: async function () {
        let paths = {
            src: path.join(__dirname, `src`),
            public: path.join(__dirname, `src`, `assets`)
        }
        return paths;
    },
}