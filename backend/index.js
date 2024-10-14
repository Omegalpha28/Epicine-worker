const express = require("express");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bulkloader = require("@mlagie/bulkloader");
const Logger = require("./src/utils/Logger");
const { connect, client, logout } = require("./core/bdd/sql-connector");
const port = 5555;
dotenv.config();
const debug = process.env.DEBUG

console.log(debug == "true");

async function main() {
    await connect({
        host: debug == "true" ? process.env.HOST : process.env.S_HOST,
        user: debug == "true" ? process.env.USER : process.env.S_USER,
        password: debug == "true" ? process.env.PASSWORD : process.env.S_PASSWORD,
        database: debug == "true" ? process.env.DATABASE : process.env.S_DBNAME,
        connectionLimit: 2,
        multipleStatements: true,
        idleTimeout: 10000,
        typeCast: true
    }).then(() => { Logger.client("- connecté à la base de donné") }).catch(error => {
        Logger.error(error);
        process.exit();
    })
    require("./core/data/functions")(client);
}

main().then(() => {

    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));

    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.raw());

    require("./src/epicine/routes/auth/auth")(client, app, bcrypt);
    require("./src/epicine/routes/user/user")(client, app, bcrypt);
    bulkloader("./src/epicine/routes/list/", [client, app, bcrypt], true);
    bulkloader("./src/epicine/routes/tmdb/", [client, app, bcrypt]);
    bulkloader("./src/forum/routes/", [client, app, bcrypt], true);
    app.listen(port, () => {
        Logger.logs(`Listening at port: ${port}`);
        Logger.serveur(`EpiCine server: http://localhost:${port}`);
    });
});

process.on('SIGINT', async () => {
    console.log("entrain de s'arrêter");

    await logout();
    process.exit();
});

process.on('SIGTERM', async () => {
    await logout();
    process.exit();
});

process.on('exit', async () => {
    await logout();
});
