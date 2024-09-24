const { validUserArgs } = require("../../utils/valid_args");
const { checkAccountMail, register, getAccountMail } = require("../user/user.query");

module.exports = async function (client, app, bcrypt) {
    app.post("/register", async (req, res) => {
        var email = req.body["email"];
        var name = req.body["name"];
        var mdp = req.body["password"];

        console.log("Received registration request for email:", email);

        if (validUserArgs(res, email, name, mdp)) {
            mdp = bcrypt.hashSync(mdp, 10);
            await checkAccountMail(client, res, email, async nb => {
                if (nb == 84) {
                    console.log("Account already exists for email:", email);
                    res.status(409).json({ "msg": "Account already exists" });
                } else {
                    console.log("Registering new account for email:", email);
                    await register(client, res, email, name, mdp);
                    console.log("Registration successful for email:", email);
                }
            });
        } else {
            console.log("Invalid user arguments for email:", email);
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
            if (nb == 84)
                res.status(404).json({"msg": "Invalid Credentials"});
        })
    });
}