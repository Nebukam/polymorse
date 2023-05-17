'use strict';

module.exports = {
    
    AbstractUserAction: require(`./abstract-user-action`),
    AbstractUpdateAction: require(`./abstract-update-action`),

    // Create actions
    Draft: require(`./action-draft`),

    // Update actions
    Edit: require(`./action-edit`),
    Publish: require(`./action-publish`),
    
}
