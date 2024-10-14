const { updateUser } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.post("/approved", auth, async (req, res) => {
        const {request_token} = req.body;
        
        if (await updateUser(client, req.uuiduser, {token_tmdb: request_token})) res.status(201).json({"msg": "token approved"});
        else res.status(500).json({ "error": "Internal server error" });
    })
}