'use strict';

module.exports = {

    AbstractUserAction: require(`../abstract-user-operation`),
    AbstractUpdateAction: require(`./abstract-update-action`),

    // Utils
    CountToken: require(`./action-count-tokens`),

    // Create actions
    Draft: require(`./action-new-draft`),

    // Update actions
    UpdateEntity: require(`./action-update-entity`),
    Publish: require(`./action-publish`),
    Unpublish: require(`./action-unpublish`),

}
