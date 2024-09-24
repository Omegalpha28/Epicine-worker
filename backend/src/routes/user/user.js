const { getUser } = require("../../core/data/config.function");
const auth = require("../../middleware/auth");
module.exports = async function (client, app, bcrypt) {
    app.get("/user", auth, async (req, res) => {
        const userData = (await getUser(client, {id: req.iduser})).data;

        if (userData != undefined)
            res.status(200).json(userData);
        else
            res.status(404).json({"msg": "Internal server error"});
    });
}