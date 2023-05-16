'use strict';

module.exports = {


    IsLoaded: function (p_entity) {
        return p_entity.header && p_entity.body ? true : false;
    },

    RequireEntity: function (p_entity, p_callback) {

        if (module.exports.IsLoaded(p_entity)) {
            p_callback(p_entity);
            return;
        }

        if (p_entity.header) {
            p_entity.LoadBody(null, () => {
                p_callback(p_entity);
            });
        } else {
            p_entity.LoadHeader(null, () => {
                p_entity.LoadBody(null, () => {
                    p_callback(p_entity);
                });
            });
        }
    },

    UpdateEntity: function(p_entity, p_data, p_callback){
        p_entity.Unserialize(p_data);
        //TODO: Update entity header timestamps
        //TODO: Save header & body (if there)
        //TODO: Callback to wrap up
    }

}