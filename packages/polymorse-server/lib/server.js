const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);
const polyCore = require(`@polymorse/core`);

const path = require(`path`);

const handlers = require(`./handlers`);
const IDS = require(`./ids`);

const links = require(`./links`);

class ServerBase extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    _Init() {
        super._Init();
    }

    _RegisterIOServices(p_ioConfigs) {
        p_ioConfigs.push({
            cl: iofs.IO,
            config: {
                transceivers: [
                    {
                        root: path.join(nkm.main.dirName, `/database/settings`),
                        uid: IDS.STORAGE_SETTINGS,
                        prependRoot: true,
                        recursive: true
                    },
                    {
                        root: path.join(nkm.main.dirName, `/database/users`),
                        uid: IDS.STORAGE_USERS,
                        prependRoot: true,
                        recursive: true
                    },
                    {
                        root: path.join(nkm.main.dirName, `/database/pages`),
                        uid: IDS.STORAGE_PAGES,
                        prependRoot: true,
                        recursive: true
                    }
                ]
            }
        });
    }

    _PrepareInternalInit() {

        super._PrepareInternalInit();

        //links.PolycoreLink.Watch();
        links.PolycoreLink.InitializeAndStart({
            settings: iofs.IO.Get(IDS.STORAGE_SETTINGS),
            users: iofs.IO.Get(IDS.STORAGE_USERS),
            pages: iofs.IO.Get(IDS.STORAGE_PAGES)
        });

    }

    _IsReadyForInit() {
        return links.PolycoreLink.ready;
    }

    _InitAPIs() {

        super._InitAPIs();

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
            userAction: {
                route: `/action`,
                handler: handlers.UserAction,
            },
            userGet: {
                route: `/action2`,
                handler: handlers.UserGet,
            },
        });

    }

    GetUser(p_req) {
        if (!this.IsAuthenticated(p_req)) { return null; }
        return polyCore.PolyMorse.GetOrCreateUserByAuthID(super.GetUser(p_req));
    }

    _Boot() {
        super._Boot();
    }

}

module.exports = ServerBase;