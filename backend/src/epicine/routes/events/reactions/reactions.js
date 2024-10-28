const { Reactions, Publication } = require("../../../../../core/data/models");
const { logs } = require("../../../../utils/Logger");
const auth = require("../../../middleware/auth")

async function addReactionIdInEvent(id_event, type_event, uuid)
{
    if (type_event == "publication") {
        const pubData = await Publication.findOne({id: id_event});
        if (pubData.data == undefined) {
            error("Publication not found");
            return 0;
        }
        let reactions = [pubData.data.reactions];

        if (reactions.includes(uuid))
            return;
        if (!pubData.data.reactions)
            reactions = [uuid];
        else
            reactions.push(uuid);
        delete pubData.data.date;
        pubData.updateOne({reactions: JSON.stringify(reactions)});
    }
}

module.exports = async function(client, app, bcrypt) {
    app.put("/add/reaction", auth, async (req, res) => {
        const {id_event, type_event, reaction} = req.body;
        logs("add reaction");
        const reactionData = (await Reactions.findOne({id_event: id_event, type_event: type_event, reaction: reaction}));
        
        if (reactionData.data == undefined) {
            const uuid = await Reactions.generate_uuid("reaction_uuid");

            if (!uuid) {
                error("There was a problem generating the uuid");
                return 0;
            }
            await Reactions.save({reaction_uuid: uuid, id_event: id_event, type_event: type_event, reaction: reaction, nb_interactions: 1, auteurs: req.uuiduser});
            addReactionIdInEvent(id_event, type_event, uuid);
            res.status(201).json({"msg": "add reaction"});
        }
        else {
            if (reactionData.data.auteurs.includes(req.uuiduser)) {
                res.status(400).json({"msg": "already reacted"});
                return;
            }
            reactionData.updateOne({nb_interactions: reactionData.data.nb_interactions + 1, auteurs: reactionData.data.auteurs.push(req.uuiduser)});
            res.status(200).json({"msg": "update number reaction"});
        }
    })
}