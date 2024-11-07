const { removeAllFavorite, removeAllWatchList } = require("../../../core/data/config.function");
const { User, Favorite, Watchlist, Likes, Fil, LikesMessage, Message } = require("../../../core/data/models");
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
        if (checkMdp(client, res, email, password, bcrypt) && (await User.findOne({email: email})).data != undefined) {
            await removeAllFavorite(client, req.uuiduser );
            await removeAllWatchList(client, req.uuiduser);
            await Likes.customRequest(`UPDATE Likes SET userUUID="97dad2b4-8bfa-11ef-9457-0242ac120002" WHERE userUUID="${req.uuiduser}"`);
            await Fil.customRequest(`UPDATE Fil SET auteur="97dad2b4-8bfa-11ef-9457-0242ac120002" WHERE auteur="${req.uuiduser}"`);
            await Likes.customRequest(`UPDATE Likes SET userUUID="97dad2b4-8bfa-11ef-9457-0242ac120002" WHERE userUUID="${req.uuiduser}"`);
            await LikesMessage.customRequest(`UPDATE LikesMessage SET auteur="97dad2b4-8bfa-11ef-9457-0242ac120002" WHERE auteur="${req.uuiduser}"`);
            await Message.customRequest(`UPDATE Message SET auteur="97dad2b4-8bfa-11ef-9457-0242ac120002" WHERE auteur="${req.uuiduser}"`);
            await User.delete({email: email});
            res.status(200).json({"msg": "deleted"});
        }
        else
            res.status(500).json({"msg": "Internal server error"});
    })
}