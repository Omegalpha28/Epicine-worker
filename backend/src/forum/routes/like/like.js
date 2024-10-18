const { getLikeMessage, addLikeMessage, removeLikeMessage } = require("../../../../core/data/config.function");
const auth = require("../../../epicine/middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.put("/add/like_message", auth, async (req, res) => {
        const {id_message, type} = req.body;
        const likeData = (await getLikeMessage(client, {id_message: id_message, auteur: req.uuiduser, type: type})).data;
        
        if (likeData == undefined) {
            await addLikeMessage(client, {id_message: id_message, auteur: req.uuiduser, type: type});
            res.status(201).json({"msg": "liked"});
        }
        else res.status(500).json({"msg": "Internal server error"});
    });
    app.delete("/remove/like_message", auth, async (req, res) => {
        const {id_message} = req.body;
        const likeData = (await getLikeMessage(client, {id_message: id_message, auteur: req.uuiduser})).data;
        
        if (likeData != undefined) {
            await removeLikeMessage(client, {id_message: id_message, auteur: req.uuiduser});
            res.status(200).json({"msg": "unliked"});
        }
        else res.status(500).json({"msg": "Internal server error"});
    })
}