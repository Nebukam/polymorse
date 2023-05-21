module.exports = {

    viewHome: {
        prefix: '/',
        view:'idx-home',
    },

    viewPage: {
        // /page/:id
        prefix: '/page',
        params: [
            { id: 'id' }
        ],
        view:'idx-page',
    },

    viewProfile: {
        // /profile/:id
        prefix: '/profile',
        params: [
            { id: 'id' }
        ],
        view:'idx-profile',
    },

    viewAdmin: {
        // /admin
        prefix: '/admin',
        view:'idx-admin',
    },

    viewCategory: {
        // /category/:id
        prefix: '/category',
        params: [
            { id: 'id' }
        ],
        view:'idx-category',
    },

    serverStatus: {
        // /server-status
        prefix: '/server-status',
        view:'idx-server-status',
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