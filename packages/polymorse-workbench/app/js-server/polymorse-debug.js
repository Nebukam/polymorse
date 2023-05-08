'use strict';
const path = require(`path`);
const fs = require(`fs`);

const nkm = require(`@nkmjs/core/nkmin`);
const polyCore = require(`@polymorse/core`);

const PolyMorse = polyCore.PolyMorse;

const polyData = polyCore.data;
const polyBlocks = polyData.blocks;

class PolymorseDebug extends nkm.com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();
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

    static GenerateDebugData(p_directory, p_flushExisting) {

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

        if (p_flushExisting) {
            try { fs.rmdirSync(p_directory, { recursive: true }); }
            catch (e) { }
        }

        // TODO : Generate a bunch of data on-disk to simulate real infos.
        // - Generate a few users profiles
        // - Generate a few pages
        // - Go through the static content generation process

        try { let location = fs.statSync(p_directory); }
        catch (e) { fs.mkdirSync(p_directory, { recursive: true }); }

        this._usersPath = path.join(p_directory, `users`);
        this._pagesPath = path.join(p_directory, `pages`);

        fs.mkdirSync(this._usersPath, { recursive: true });
        fs.mkdirSync(this._pagesPath, { recursive: true });

        this.GenerateUser(`Admin`);
        for (let i = 0; i < 10; i++) { this.GenerateUser(nkm.u.tils.UUID); }

        for (let i = 0; i < 100; i++) { this.GeneratePage(); }

    }

    static GenerateUser(p_uid) {

        let user = PolyMorse.CreateUser(p_uid);
        user.LoadHeader();
        user.LoadBody();

        this.SaveEntity(user);

    }

    static GeneratePage() {

        let
            uuid = nkm.u.tils.UUID,
            page = PolyMorse.CreatePage(uuid),
            uList = PolyMorse.instance._users._entities,
            owner = uList[Math.floor(Math.random() * uList.length)];

        let pageHeader = page.LoadHeader();
        pageHeader.Set(polyData.IDS.OWNER_ID, owner.uuid);

        let pageBody = page.LoadBody();

        //this.MkDirs(this._pagesPath, uuid);
        this.SaveEntity(page);

    }

    static GenerateTranslation(p_morse) {

    }

    static SaveEntity(p_entity) {

        let
            baseDir = nkm.u.isInstanceOf(p_entity, polyData.User) ? this._usersPath : this._pagesPath,
            uuidDir = path.join(baseDir, p_entity.uuid);

        this.BootstrapEntityDirectory(baseDir, p_entity.uuid);

        fs.writeFileSync(path.join(uuidDir, `header.json`), JSON.stringify(p_entity.header.Serialize()));
        fs.writeFileSync(path.join(uuidDir, `body.json`), JSON.stringify(p_entity.body.Serialize()));

    }

    static BootstrapEntityDirectory(p_base, p_uid) {

        let
            baseDir = path.join(p_base, p_uid),
            localesDir = path.join(baseDir, `locales`),
            assetsDir = path.join(baseDir, `assets`);

        fs.mkdirSync(baseDir, { recursive: true });
        fs.mkdirSync(localesDir, { recursive: true });
        fs.mkdirSync(assetsDir, { recursive: true });

        PolyMorse.locales.forEach(loc => {
            fs.mkdirSync(path.join(localesDir, loc));
        });

    }

}

module.exports = PolymorseDebug;