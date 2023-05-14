module.exports = {
    link: require(`./link`),

    getListUsers: {
        // api/get/list/users
        prefix: '/list/users'
    },
    getUser: {
        // api/get/user/:id
        prefix: '/user',
        params: ['id']
    },
}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) { module.exports[id].name = id; }
}