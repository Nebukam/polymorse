const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);
const polyCore = require(`@polymorse/core`);

const handlers = require(`./handlers`);
const IDS = require(`./ids`);

class ServerBase extends nkm.server.ServerBase {
    constructor(p_config) { super(p_config); }

    _RegisterIOServices(p_ioConfigs) {
        p_ioConfigs.push({
            cl: iofs.IO,
            config: {
                transceivers: [
                    {
                        root: `/database/users`,
                        uid: IDS.STORAGE_USERS
                    },
                    {
                        root: `/database/pages`,
                        uid: IDS.STORAGE_PAGES
                    }
                ]
            }
        });
    }

    _InitServer() {
        super._InitServer();

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


        nkm.server.actions.Manager.AddMultiple({

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

}

module.exports = ServerBase;