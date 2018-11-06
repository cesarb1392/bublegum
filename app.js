'user strict';


const ApiServer = require('./api/server');
const Config = require('./api/Config/ServerConfig');

const newServer = ApiServer.Server.bootstrap();
const server = require(Config.protocol).createServer(newServer.app);

server.listen(Config.normalizePort());

server.on("error", Config.onError);

server.on("listening", Config.onListening);
