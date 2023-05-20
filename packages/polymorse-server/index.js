
'use strict';

module.exports = {
    ServerBase: require(`./lib/server`),

    IDS: require(`./lib/ids`),

    links:require(`./lib/links`),
    api: require(`./lib/api`),
    handlers: require(`./lib/handlers`),
    
    openai: require(`./lib/openai`),

}