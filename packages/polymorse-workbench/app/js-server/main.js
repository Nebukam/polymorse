const server = require(`@polymorse/server`);

class ServerProcess extends server.ServerBase {
    constructor(p_config) { super(p_config); }

    _Init() {

        super._Init();

    }

}

module.exports = ServerProcess;