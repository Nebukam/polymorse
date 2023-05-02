'use strict';

const nkm = require(`@nkmjs/core`);

const polyData = require(`./data`);
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
            try {

            } catch (e) {

            }
        }

        // TODO : Generate a bunch of data on-disk to simulate real infos.
        // - Generate a few users profiles
        // - Generate a few pages
        // - Go through the static content generation process

        this.GenerateUser(`Admin`);
        for (let i = 0; i < 10; i++) { this.GenerateUser(nkm.u.tils.UUID); }

    }

    static GenerateUser(p_uid) {
        let user = ;
        this._users.push(user);
    }

    static GenerateMorse() {
        let
            randomID = nkm.u.tils.UUID,
            morse = nkm.com.Rent(polyData.Morse);

        morse.CreateBlock

    }

    static GenerateTranslation(p_morse) {

    }

}

module.exports = PolymorseDebug;