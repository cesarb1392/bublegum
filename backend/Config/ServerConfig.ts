const _this = module.exports = {
    postgres:{
        port: 5432,
        host: 'localhost',
        user: 'postgres_user',
        password: 'cesar',
        database: 'postgres_user',
        dialect: 'postgres',
        operatorsAliases: false,
        pool:  {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    port: 3000,
    protocol: 'http',

    session: {
        name: 'bublegum-session-cookieId',
        secret: 'my express secret',
        saveUninitialized: true,
        resave: true,
        cookie: {
            expires: 600000
        }
    },

    // const env = process.env.NODE_ENV || 'development';




    onError: (error) => {
        if (error.syscall !== "listen") {
            throw error;
        }
        const bind = typeof _this.port === "string"
            ? "Pipe " + _this.port
            : "Port " + _this.port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    },
    normalizePort: () => {
        const port = parseInt(_this.port.toString(), 10);
        if (isNaN(port)) {
            return _this.port;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    },
    onListening: () => {
        // const addr = server.address();
        // const bind = typeof addr === "string"
        //     ? "pipe " + addr
        //     : "port " + addr.port;
        console.log("Listening on " + _this.port);
    }

};
