'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const polyCore = require(`@polymorse/core`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = require(`./abstract-update-action`);
class UpdateEntity extends base {
    constructor() { super(); }

    static __NFO__ = polyCore.api.actions.update;

    async _InternalExecute(p_params, p_resolve = true) {

        //TODO: Deserialize the entity into a temp object
        //to create a diff and only request translation for FLAGS.LOCALIZABLE values.

        //Update the raw data accordingly
        //Save the raw data

        //THEN Kick translation
        //For each locale, load, update & save.

        //THEN Update stats & metrics
        //-> Have a stat update method that also aim at updating the most relevant settings.
        //-> latest post in category, etc.

        //THEN return success.

        if(p_resolve){
            return this._OnSuccess();
        }

        return false;
    }

}

module.exports = UpdateEntity;