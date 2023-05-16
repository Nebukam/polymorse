const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);
const polyCore = require(`@polymorse/core`);
const PolyMorse = polyCore.PolyMorse;


const path = require(`path`);

const handlers = require(`./handlers`);
const IDS = require(`./ids`);

const links = require(`./links`);
const actions = require("./actions");

class ServerBase extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    static __defaultIOFS = iofs.IO;

    _Init() {
        polyCore.PolyMorse._serverSide = true;
        super._Init();
    }

    _RegisterIOServices(p_ioConfigs) {
        p_ioConfigs.push({
            cl: this.constructor.__defaultIOFS,
            config: {
                transceivers: [
                    {
                        root: path.join(nkm.main.dirName, `./database/settings`),
                        uid: IDS.STORAGE_SETTINGS
                    },
                    {
                        root: path.join(nkm.main.dirName, `/database/users`),
                        uid: IDS.STORAGE_USERS
                    },
                    {
                        root: path.join(nkm.main.dirName, `/database/pages`),
                        uid: IDS.STORAGE_PAGES
                    },
                    {
                        root: path.join(nkm.main.dirName, `/database/drafts`),
                        uid: IDS.STORAGE_DRAFTS
                    }
                ]
            }
        });
    }

    _PrepareInternalInit() {

        super._PrepareInternalInit();

        //links.PolycoreLink.Watch();
        links.PolycoreLink.InitializeAndStart(this._GetPolylinkConfig());

    }

    _GetPolylinkConfig() {
        return {
            registries: [
                { registry: PolyMorse.settingsRegistry, io: iofs.IO.Get(IDS.STORAGE_SETTINGS) },
                { registry: PolyMorse.userRegistry, io: iofs.IO.Get(IDS.STORAGE_USERS) },
                { registry: PolyMorse.pageRegistry, io: iofs.IO.Get(IDS.STORAGE_PAGES) },
                { registry: PolyMorse.draftRegistry, io: iofs.IO.Get(IDS.STORAGE_DRAFTS) },
            ]
        };
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

        nkm.server.AddGetters(require(`./getters`));
        nkm.server.AddActions(require(`./actions`));
        this._RegisterAPIs(require(`./routes`));

    }

    GetUser(p_req) {
        if (!this.IsAuthenticated(p_req)) { return null; }
        return polyCore.PolyMorse.GetOrCreateUserByAuthID(super.GetUser(p_req));
    }

    InitMainSettings(p_doneCb){
        //Init main settings
        console.log(`First time settings init`);
        p_doneCb();
    }

    ProcessMainSettings(p_doneCb){
        console.log(`Processing settings`);
        p_doneCb();
    }

    _Boot() {
        super._Boot();
    }

}

module.exports = ServerBase;