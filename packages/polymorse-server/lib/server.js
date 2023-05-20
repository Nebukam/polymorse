const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);

const polyCore = require(`@polymorse/core`);
const PolyMorse = polyCore.PolyMorse;


const path = require(`path`);

const handlers = require(`./handlers`);
const FLAGS = require(`./flags`);
const IDS = require(`./ids`);

const links = require(`./links`);
const api = require("./api");

class ServerBase extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    static __defaultIOFS = iofs.IO;

    _Init() {
        polyCore.PolyMorse._serverSide = true;
        nkm.server.operations.Manager.defaultHandler = handlers.Operation;
        nkm.server.operations.Actions.defaultHandler = handlers.Action;
        super._Init();
    }

    _RegisterIOServices(p_ioConfigs) {

        //modeled after the conservative lower end limit of AWS S3 api.
        let defaultRateLimit = { tokensPerInterval: 3500, interval: "second" };

        p_ioConfigs.push({
            cl: this.constructor.__defaultIOFS,
            config: {
                transceivers: [
                    {
                        root: path.join(this.dirName, `./database/settings`),
                        uid: IDS.STORAGE_SETTINGS
                    },
                    {
                        root: path.join(this.dirName, `/database/users`),
                        uid: IDS.STORAGE_USERS,
                        rateLimit: defaultRateLimit
                    },
                    {
                        root: path.join(this.dirName, `/database/pages`),
                        uid: IDS.STORAGE_PAGES,
                        rateLimit: defaultRateLimit
                    },
                    {
                        root: path.join(this.dirName, `/database/drafts`),
                        uid: IDS.STORAGE_DRAFTS,
                        rateLimit: defaultRateLimit
                    }
                ]
            }
        });
    }

    _GetPolylinkConfig() {
        return {
            registries: [
                {
                    registry: PolyMorse.settingsRegistry,
                    io: iofs.IO.Get(IDS.STORAGE_SETTINGS),
                    preload: [
                        polyCore.data.IDS.BLOC_HEADER,
                        polyCore.data.IDS.BLOC_BODY
                    ]
                },
                {
                    registry: PolyMorse.userRegistry,
                    io: iofs.IO.Get(IDS.STORAGE_USERS),
                    preload: [
                        polyCore.data.IDS.BLOC_HEADER,
                        //polyCore.data.IDS.BLOC_BODY
                    ]
                },
                {
                    registry: PolyMorse.pageRegistry,
                    io: iofs.IO.Get(IDS.STORAGE_PAGES),
                    preload: [
                        //polyCore.data.IDS.BLOC_HEADER,
                    ]
                },
                {
                    registry: PolyMorse.draftRegistry,
                    io: iofs.IO.Get(IDS.STORAGE_DRAFTS),
                    preload: []
                },
            ]
        };
    }

    async _PrepareInternalInit() {

        let views = await require(`@polymorse/views`).GetPaths();
        if (views.src) { this._viewPaths.push(views.src); }
        if (views.public) { this._staticPaths.push(views.public); }

        links.PolycoreLink.WatchOnce(nkm.com.SIGNAL.READY, () => { super._PrepareInternalInit(); });
        links.PolycoreLink.InitializeAndStart(this._GetPolylinkConfig());
    }

    async _InitAPIs() {

        await super._InitAPIs();

        nkm.server.AddOperations(api.ops);
        nkm.server.AddOperations(api.views, handlers.View);
        nkm.server.AddActions(api.actions);
        //this._RegisterAPIs(require(`./routes`));

    }

    GetUser(p_req) {
        if (!this.IsAuthenticated(p_req)) { return null; }
        return polyCore.PolyMorse.GetOrCreateUserByAuthID(super.GetUser(p_req));
    }

    InitMainSettings(p_doneCb) {
        //Init main settings
        console.log(`First time settings init`);
        p_doneCb();
    }

    ProcessMainSettings(p_doneCb) {
        console.log(`Processing settings`);
        p_doneCb();
    }

    _Boot() {
        super._Boot();
    }

}

module.exports = ServerBase;