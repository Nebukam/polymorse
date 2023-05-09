
'use strict';

module.exports = {
    ServerBase: require(`./lib/server`),

    IDS:require(`./lib/ids`),
    
    handlers: require(`./lib/handlers`),
    openai: require(`./lib/openai`),

}