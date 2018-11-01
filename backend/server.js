'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { Pool, Client } = require('pg');
const config = require('./config/config');
const LoginController_1 = require("./Controllers/LoginController");
const port = 3000;
const app = express();
function run() {
    initControllers();
    initConexions();
    // app.get('/', (req, res) => {
    //     res.send('Hello World!');
    // });
    // app.listen(port, () => console.log(`app listening on port ${port}!`));
}
exports.run = run;
function initConexions() {
    // pg.connect('postgres://postgres:pguser@localhost:5432/pguser');
    console.log(config.postgres);
    const pool = new Pool(config.postgres);
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        // client.query('SELECT * FROM GetAllStudent()', function (err, result) {
        //     done();
        //     if (err) {
        //         console.log(err);
        //         res.status(400).send(err);
        //     }
        //     res.status(200).send(result.rows);
        // })
    });
}
function initControllers() {
    const loginController = new LoginController_1.LoginController();
}
