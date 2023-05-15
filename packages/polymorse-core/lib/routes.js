module.exports = {

    getListUsers: {
        // api/get/list/users
        prefix: '/list/users',
        params: [
            { id: 'test' }
        ]
    },

    getListPages: {
        // api/get/list/pages/:id
        prefix: '/list/pages',
        params: [
            { id: 'id' }
        ]
    },

    getListDrafts: {
        // api/get/list/drafts/:id
        prefix: '/list/drafts',
        params: [
            { id: 'id' }
        ]
    },

    getPage: {
        // api/get/page/:id/:locale
        prefix: '/page',
        params: [
            { id: 'id' },
            { id: 'locale', default:'raw' }
        ]
    },

    getUser: {
        // api/get/user/:id
        prefix: '/user',
        params: [{ id: 'id' }]
    },

}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) { module.exports[id].name = id; }
}