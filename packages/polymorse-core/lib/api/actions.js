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
    },

    countTokens: {
        body: {
            content: { type: 'string' }
        }
    }

}

for (let id in module.exports) {
    let req = module.exports[id];
    if (req.constructor === Object) {
        let obj = module.exports[id];
        obj.action = true;
        obj.method = obj.method || 'POST';
        obj.name = id;
        obj.requireAuth = true;
    }
}