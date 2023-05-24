'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const links = require(`./links`);

module.exports = {


    IsLoaded: function (p_entity) {
        return p_entity.header && p_entity.body ? true : false;
    },

    GetOrCreateUser: async function (p_authUserInfos) {

        let
            userRegistry = polyCore.PolyMorse.userRegistry,
            userId = nkm.io.SanitizeFileName(p_authUserInfos.sub),
            regLink = links.PolycoreLink.GetRegistryLink(userRegistry),
            user = await regLink.RequireEntity(userId);

        if (!user) {
            //Create new user
            user = userRegistry.Create(userId);
            user.Set(polyCore.data.IDS.NAME, p_authUserInfos.name || p_authUserInfos.nickname);
            user.Set(polyCore.data.IDS.COVER, p_authUserInfos.picture || ``);
            await user.header.RequestSave();
        }

        return user;

    },

    UpdateEntity: function (p_entity, p_data, p_callback) {
        p_entity.Unserialize(p_data);
        //TODO: Update entity header timestamps
        //TODO: Save header & body (if there)
        //TODO: Callback to wrap up
    },

    /**
     * Try to get the latest draft owned by the given user.
     * @param {*} p_user 
     * @param {*} p_callback 
     */
    TryGetLatestDraft(p_user, p_callback) {


    },

    TryGetDraftForEdit(p_user, p_draftId, p_callback) {

    },

    TryGetPageForEdit(p_user, p_pageId, p_callback) {

    }

}