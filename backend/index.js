const express = require("express");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const Logger = require("./src/utils/Logger");
const { connect, client, logout } = require("./core/bdd/sql-connector");
const port = 5555;

dotenv.config();

async function main() {
    await connect({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
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
        methods: ['GET', 'POST'],
        credentials: true
    }));

    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.raw());

    require("./src/epicine/routes/auth/auth")(client, app, bcrypt);
    require("./src/epicine/routes/user/user")(client, app, bcrypt);
    require("./src/epicine/routes/list/list_tv")(client, app, bcrypt);
    require("./src/epicine/routes/list/series_tv")(client, app, bcrypt);
    require("./src/epicine/routes/list/movie_tv")(client, app, bcrypt);
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
