const { User } = require("../../../../core/data/models");
const { validUserArgs } = require("../../../utils/valid_args");
const auth = require("../../middleware/auth");
const { checkAccountMail, register, getAccountMail, checkMdp } = require("../user/user.query");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async function (client, app, bcrypt) {
    app.post("/register", async (req, res) => {
        var email = req.body["email"];
        var name = req.body["name"];
        var mdp = req.body["password"];

        if (validUserArgs(res, email, name, mdp)) {
            mdp = bcrypt.hashSync(mdp, 10);
            await checkAccountMail(client, res, email, async nb => {
                if (nb == 84) {
                    res.status(409).json({ "msg": "Account already exists" });
                } else {
                    await register(client, res, email, name, mdp);
                }
            });
        }
    });

    app.post("/login", async (req, res) => {
        var email = req.body["email"];
        var mdp = req.body["password"];

        if (email == undefined || mdp == undefined) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        if (email.length == 0 || mdp.length == 0) {
            res.status(400).json({"msg": "email and password is required"});
            return;
        }
        await getAccountMail(client, res, email, mdp, bcrypt, async nb => {
            if (nb == 84) {
                await sleep(1000);
                res.status(404).json({"msg": "Invalid Credentials"});
            }
        })
    });
    app.delete("/delete", auth, async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password || email.length == 0 || password.length == 0) res.status(400).json({"msg": "email and password is required"});
        if (User.count({email: email}) == 0) res.status(404).json({"msg": "Internal server error"});
        if (checkMdp(client, res, email, password)) {
            User.deleteOne({email: email, password: password});
            res.status(200).json({"msg": "deleted"});
        }
        else
            res.status(500).json({"msg": "Internal server error"});
    })
}