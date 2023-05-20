module.exports = {

    newDraft: {

    },

    publish: {

    },

    unpublish: {

    },

    update: {

    },

    delete: {

    },

    batchUpdate: {

    },

    batchDelete: {

    }

}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) {
        let obj = module.exports[id];
        obj.name = id;
        obj.requireAuth = true;
    }
}