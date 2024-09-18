const express = require("express");
var bcrypt = require("bcryptjs");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const port = 5555;
const {logs, serveur} = require("./src/utils/Logger");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
dotenv.config();

app.listen(port, () => {
    logs(`Listening at port: ${port}`);
    serveur(`EpiTodo server: http://localhost:${port}`);
});
