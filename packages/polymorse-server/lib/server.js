const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

const handlers = require(`./handlers`);
const { Configuration, OpenAIApi } = require("openai");

const ActionManager = require(`./action-manager`);

class ServerBase extends nkm.server.ServerBase {
    constructor(p_config) { super(p_config); }

    _Init() {
        super._Init();

        /*
        
            Draft API
            User actions:
            - Open navigator to /admin
                -> Check if user has clearance for admin
                    -> Serve admin 
                -> if not, serve /profile instead
            - Open navigator to /profile/(no id)
                -> Serve logged user profile (build full JSON of drafts & published pages, as well as profile details)
            - Open navigator to /profile/:id
                -> Serve profile (build full JSON of drafts & published pages, as well as profile details)
            - Open navigator to /edit/(no id)
                -> Serve drafting page (create new entry as draft, return page uuid)
            - Open navigator to /edit/:id
                -> Serve drafting page (retrieve identified draft, if does not exist, redirect to draft/)
            - Open navigator to /resume
                -> Redirect to latest edited page (published or not)
            - Open navigator to /page/:id/:locale
                -> Serve page in selected locale, or 
            
        */


        ActionManager._RegisterActions({
            publish
        });

        this._RegisterAPIs({
            getUserProfile: {
                route: `/user/profile/:id`,
                handler: handlers.UserProfile,
                start: true
            },
            getUserProfile64: {
                route: `/user/profile64/:id`,
                handler: handlers.UserProfile64,
                start: true
            },
            getFriendlist: {
                route: `/user/friendlist/:id`,
                handler: handlers.UserFriendlist,
                start: true
            },
            getLibrary: {
                route: `/user/library/:id`,
                handler: handlers.UserLibrary,
                start: true
            },
            getStore: {
                route: `/store/:id`,
                handler: handlers.Store,
                start: true
            },
            getDeal: {
                route: `/deal/:id`,
                handler: handlers.Deal,
                start: true
            }
        });
    }

    _Boot() {

        polyCore.PolyMorse.userRegistry.Watch(polyCore.SIGNAL.ENTITY_CREATED,
            (p_registry, p_entity) => {

            });

        polyCore.PolyMorse.pageRegistry.Watch(polyCore.SIGNAL.ENTITY_CREATED,
            (p_registry, p_entity) => {

            });

    }

}W

module.exports = ServerBase;