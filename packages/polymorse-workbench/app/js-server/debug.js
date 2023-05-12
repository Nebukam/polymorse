'use strict';
const path = require(`path`);
const fs = require(`fs`);

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);
const polyServer = require(`@polymorse/server`);
const PolyMorse = polyCore.PolyMorse;
const polyData = polyCore.data;
const polyBlocks = polyData.blocks;

const iofs = require(`@nkmjs/server-io-fs`);

class Debug {
    constructor() {

        this._users = [];
        this._blockList = [
            polyBlocks.Text,
            polyBlocks.Video,
            polyBlocks.Markdown,
            polyBlocks.Image,
            polyBlocks.Video,
            polyBlocks.Embed,
        ];

    }

    GenerateDebugData(p_flushExisting) {

        /*

        data/
        data/users/
        data/users/{uuid}/
        data/users/{uuid}/header.json
        data/users/{uuid}/body.json
        data/users/{uuid}/locales/en/body.json
        data/users/{uuid}/locales/fr/body.json
        data/users/{uuid}/locales/jp/body.json
        data/users/{uuid}/assets/pfp.jpg

        data/pages/
        data/pages/{uuid}/
        data/pages/{uuid}/header.json
        data/pages/{uuid}/body.json
        data/pages/{uuid}/locales/en/body.json
        data/pages/{uuid}/locales/fr/body.json
        data/pages/{uuid}/locales/jp/body.json
        data/users/{uuid}/assets/
        data/users/{uuid}/assets/image.jpg

        */

        this._usersTs = iofs.IO[polyServer.IDS.STORAGE_USERS];
        this._pagesTs = iofs.IO[polyServer.IDS.STORAGE_PAGES];

        if (p_flushExisting) {
            try { fs.rmSync(this._usersTs.Join(``), { recursive: true }); }
            catch (e) { }
            try { fs.rmSync(this._pagesTs.Join(``), { recursive: true }); }
            catch (e) { }
        }

        // TODO : Generate a bunch of data on-disk to simulate real infos.
        // - Generate a few users profiles
        // - Generate a few pages
        // - Go through the content generation process

        this.GenerateUser(`Admin`);
        for (let i = 0; i < 10; i++) { this.GenerateUser(nkm.u.tils.UUID); }

        for (let i = 0; i < 100; i++) { this.GeneratePage(); }

    }

    GenerateUser(p_uid) {

        let user = PolyMorse.userRegistry.Create(p_uid);
        user.LoadHeader();
        user.LoadBody();

        this.SaveEntity(user);

    }

    GeneratePage() {

        let
            uuid = nkm.u.tils.UUID,
            page = PolyMorse._pages.Create(uuid),
            uList = PolyMorse._users._entities,
            owner = uList[Math.floor(Math.random() * uList.length)];

        let pageHeader = page.LoadHeader();
        pageHeader.Set(polyData.IDS.OWNER_ID, owner.uuid);

        let pageBody = page.LoadBody();

        //this.MkDirs(this._pagesPath, uuid);
        this.SaveEntity(page);

    }

    GenerateTranslation(p_morse) {

    }

    SaveEntity(p_entity) {

        let ts = nkm.u.isInstanceOf(p_entity, polyData.User) ? this._usersTs : this._pagesTs;

        //this.BootstrapEntityDirectory(baseDir, p_entity.uuid);

        ts.WriteFile(
            ts.Join(p_entity.uuid, `header.json`),
            JSON.stringify(p_entity.header.Serialize()),
            (err, p_path, p_success) => { },
            { recursive: true }
        );

        ts.WriteFile(
            ts.Join(p_entity.uuid, `body.json`),
            JSON.stringify(p_entity.body.Serialize()),
            (err, p_path, p_success) => { },
            { recursive: true }
        );

    }

    BootstrapEntityDirectory(p_base, p_uid) {

        let
            baseDir = path.join(p_base, p_uid),
            localesDir = path.join(baseDir, `locales`),
            assetsDir = path.join(baseDir, `assets`);

        fs.mkdirSync(baseDir, { recursive: true });
        fs.mkdirSync(localesDir, { recursive: true });
        fs.mkdirSync(assetsDir, { recursive: true });

        PolyMorse.locals.forEach(loc => {
            fs.mkdirSync(path.join(localesDir, loc));
        });

    }

}

module.exports = new Debug();