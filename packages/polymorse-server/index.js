
'use strict';

module.exports = {
    ServerBase: require(`./lib/server`),

    IDS: require(`./lib/ids`),

    links:require(`./lib/links`),

    actions: require(`./lib/actions`),
    getters: require(`./lib/getters`),
    handlers: require(`./lib/handlers`),
    
    openai: require(`./lib/openai`),

}