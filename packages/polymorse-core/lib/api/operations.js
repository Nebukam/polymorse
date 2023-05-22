module.exports = {

    getRegistries: {
        // /get/registries
        prefix: '/get/registries',
    },

    getListSettings: {
        // /get/list/settings
        prefix: '/get/list/settings',
    },

    getListDrafts: {
        // /get/list/drafts/:id
        prefix: '/get/list/drafts',
        params: [
            { id: 'id' }
        ]
    },

    getListPages: {
        // /get/list/pages/:id
        prefix: '/get/list/pages',
        params: [
            { id: 'id' }
        ]
    },

    getListUsers: {
        // /get/list/users
        prefix: '/get/list/users',
        params: [
            { id: 'test' }
        ]
    },



    getDraft: {
        // /get/draft/:id
        prefix: '/get/entity/draft',
        params: [
            { id: 'id' },
        ]
    },

    getPage: {
        // /get/page/:id/:locale
        prefix: '/get/entity/page',
        params: [
            { id: 'id' },
            { id: 'locale', default: 'raw' }
        ]
    },

    getUser: {
        // /get/user/:id
        prefix: '/get/entity/user',
        params: [
            { id: 'id' },
            { id: 'locale', default: 'raw' } //raw, en, fr, ... only applies to header & body.
        ]
    },

    getCurrentUser: {
        // /get/currentUser
        prefix: '/get/currentUser'
    },

    postUpdate: {
        // /update/:registry
        prefix: '/update',
        params: [
            { id: 'registry' }
        ],
        body: {
            entityId: { type: 'string' },
            header: { optional: true, type: 'object' },
            body: { optional: true, type: 'object' }
        }
    },

}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) {
        let obj = module.exports[id];
        obj.name = id;
        obj.requireAuth = true;
    }
}