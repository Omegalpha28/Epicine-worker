const express = require("express");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const Logger = require("./src/utils/Logger");
const { connect, client, logout } = require("./src/core/bdd/sql-connector");
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
    }).then(() => {Logger.client("- connecté à la base de donné")}).catch(error => {
        Logger.error(error);
        process.exit();
    });
    require("./src/core/data/functions")(client);
}

main().then(() => {
    app.use(cors({ // Configurer CORS
        origin: 'http://localhost:5173', // Remplace par l'URL de ton frontend
        methods: ['GET', 'POST'], // Méthodes autorisées
        credentials: true // Si tu veux permettre les cookies avec les requêtes
    }));

    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.raw());
    
    require("./src/routes/auth/auth")(client, app, bcrypt);
    require("./src/routes/user/user")(client, app, bcrypt);
    app.listen(port, () => {
        Logger.logs(`Listening at port: ${port}`);
        Logger.serveur(`EpiTodo server: http://localhost:${port}`);
    });
});

process.on('SIGINT', async () => {
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
