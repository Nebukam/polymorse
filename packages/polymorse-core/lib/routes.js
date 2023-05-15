module.exports = {

    getListSettings: {
        // api/get/list/settings
        prefix: '/list/settings',
    },

    getListDrafts: {
        // api/get/list/drafts/:id
        prefix: '/list/drafts',
        params: [
            { id: 'id' }
        ]
    },

    getListPages: {
        // api/get/list/pages/:id
        prefix: '/list/pages',
        params: [
            { id: 'id' }
        ]
    },

    getListUsers: {
        // api/get/list/users
        prefix: '/list/users',
        params: [
            { id: 'test' }
        ]
    },



    getDraft: {
        // api/get/draft/:id
        prefix: '/entity/draft',
        params: [
            { id: 'id' },
        ]
    },

    getPage: {
        // api/get/page/:id/:locale
        prefix: '/entity/page',
        params: [
            { id: 'id' },
            { id: 'locale', default: 'raw' }
        ]
    },

    getUser: {
        // api/get/user/:id
        prefix: '/entity/user',
        params: [
            { id: 'id' },
            { id: 'locale', default: 'raw' } //raw, en, fr, ... only applies to header & body.
        ]
    },

}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) { module.exports[id].name = id; }
}