'use strict';

module.exports = {
    
    AbstractUserAction: require(`./abstract-user-action`),
    AbstractUpdateAction: require(`./abstract-update-action`),

    // User actions
    CreateDraft: require(`./action-create-draft`),

    // Update actions
    Edit: require(`./action-edit`),
    Publish: require(`./action-publish`),
    
}
