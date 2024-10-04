const { client } = require("../core/bdd/sql-connector");
const { getUser } = require("../core/data/config.function");

module.exports = (req, res, next) => {
    var uuid = req.params.uuid;

    if (uuid) {
        const userData = getUser(client, {uuid: uuid});

        if (userData == undefined || userData.length == 0)
            res.status(404).json({"msg": "Bad parameter"});
        else
            next();
    }
    else
        res.status(500).json({ "msg": "Internal server error" })
}