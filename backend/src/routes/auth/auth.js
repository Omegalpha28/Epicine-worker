const { logs } = require("../../utils/Logger");
const { validUserArgs } = require("../../utils/valid_args");
const { checkAccountMail, register } = require("../user/user.query");

module.exports = async function (client, app, bcrypt) {
    app.post("/register", (req, res) => {
        var email = req.body["email"];
        var name = req.body["name"];
        var mdp = req.body["password"];

        if (validUserArgs(res, email, name, mdp)) {
            mdp = bcrypt.hashSync(mdp, 10);
            checkAccountMail(client, res, email, async nb => {
                if (nb == 84)
                    res.status(409).json({ "msg": "Account already exists" });
                else
                    await register(client, res, email, name, mdp);
            })
        }
    })
}