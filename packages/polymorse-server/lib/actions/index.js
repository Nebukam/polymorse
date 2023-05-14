'use strict';

module.exports = {
    
    AbstractUserAction: require(`./abstract-user-action`),
    AbstractUpdateAction: require(`./abstract-update-action`),

    // User actions
    CreatePage: require(`./action-create-page`),

    // Update actions
    Edit: require(`./action-edit`),
    Publish: require(`./action-publish`),
    
}
