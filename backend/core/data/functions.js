const { error } = require("../../src/utils/Logger");
const { User, Favorite, Watchlist, Fil, Likes, Message, LikesMessage, Publication } = require("./models");


module.exports = client => {
    client.getUser = async (userInfo) => {
        return userData = await User.findOne(userInfo);
    }

    client.createUser = async (name, email, mdp) => {
        try {
            const uuid = await User.generate_uuid();

            if (!uuid) {
                error("There was a problem generating the uuid");
                return 0;
            }
            const result = await User.save({ uuid: uuid, name: name, email: email, password: mdp });

            result["uuid"] = uuid;
            return result;
        } catch (err) {
            error(err);
            return 0;
        }
    }

    client.updateUser = async (uuid, settings) => {
        let userData = await client.getUser({ uuid: uuid });

        if (typeof userData.data != "object") userData.data = {};
        return userData.updateOne(settings);
    }

    client.getFavoriteUnique = async (favInfo) => {
        return await Favorite.findOne(favInfo);
    }

    client.getFavorite = async (favInfo) => {
        return await Favorite.find(favInfo);
    }

    client.addFavorite = async (uuid, item_id, type, is_view) => {
        const favData = (await Favorite.findOne({ userUUID: uuid, item_id: item_id, type: type, is_view: is_view })).data;

        if (!favData)
            return await Favorite.save({ userUUID: uuid, item_id: item_id, type: type });
        return 0;
    }

    client.removeAllFavorite = async (uuid) => {
        return await Favorite.delete({ userUUID: uuid });
    }
    client.removeFavorite = async (uuid, item_id) => {
        return await Favorite.delete({ userUUID: uuid, item_id: item_id });
    }

    client.getWatchListUnique = async (watchInfo) => {
        return await Watchlist.findOne(watchInfo);
    }

    client.getWatchList = async (watchInfo) => {
        return await Watchlist.find(watchInfo);
    }

    client.addWatchList = async (uuid, item_id) => {
        const watchData = (await Watchlist.findOne({ userUUID: uuid, item_id: item_id })).data;

        if (!watchData)
            return await Watchlist.save({ userUUID: uuid, item_id: item_id });
        return 0;
    }

    client.removeAllWatchList = async (uuid) => {
        return await Watchlist.delete({ userUUID: uuid });
    }

    client.removeWatchList = async (uuid, item_id) => {
        return await Watchlist.delete({ userUUID: uuid, item_id: item_id });
    }

    client.getFilPopular = async () => {
        return await client.customRequest("SELECT Fil.id,Fil.titre,Fil.description,SUM(IFNULL(Likes.type,0)) AS somme FROM Message LEFT Join Likes ON Likes.id_message=Message.id JOIN Fil ON Fil.id=Message.id_fil GROUP BY Fil.id ORDER BY somme DESC LIMIT 10");
    }

    client.getFil = async (filInfo) => {
        return await Fil.find(filInfo);
    }
    client.updateFil = async (auteur, filInfo) => {
        const filData = (await client.getFil({id: filInfo.id, auteur: auteur}));

        if (filData.data[0] != undefined)
            delete filData.data[0].date;
        return await filData.updateOne(filInfo);
    }
    client.getLikeUnique = async (likeInfo) => {
        return await Likes.findOne(likeInfo);
    }
    client.getLike = async (likeInfo) => {
        return await Likes.find(likeInfo);
    }
    client.addLike = async (likeInfo) => {
        const likeData = (await client.getLikeUnique(likeInfo)).data;

        if (!likeData)
            return await Likes.save(likeInfo);
        return 0;
    }
    client.removeLike = async (likeInfo) => {
        return await Likes.delete(likeInfo);
    }
    client.getMessageUnique = async (messageInfo) => {
        return await Message.findOne(messageInfo);
    }
    client.getMessage = async (messageInfo) => {
        return await Message.customRequest(`SELECT Message.id, Message.id_fil, Message.text, Message.date, Message.report, Message.auteur, 
        SUM(CASE WHEN LikesMessage.type = 1 THEN 1 ELSE 0 END) AS likes, 
        SUM(CASE WHEN LikesMessage.type = -1 THEN 1 ELSE 0 END) AS dislikes 
        FROM Message 
        LEFT JOIN LikesMessage ON LikesMessage.id_message = Message.id 
        JOIN User ON User.uuid = Message.auteur 
        WHERE Message.id_fil = ${messageInfo.id_fil} 
        GROUP BY Message.id`);
    }
    client.addMessage = async (messageInfo) => {
        return await Message.save(messageInfo);
    }
    client.updateMessage = async (auteur, messageInfo) => {
        const messageData = await client.getMessageUnique({id: messageInfo.id, auteur: auteur});

        if (messageData.data.date != undefined)
            delete messageData.data.date;
        if (!messageData.data)
            return 0;
        return await messageData.updateOne(messageInfo);
    }
    client.removeMessage = async (messageInfo) => {
        const messageData = await client.getMessageUnique({id: messageInfo.id, id_fil: messageInfo.id_fil, auteur: messageInfo.auteur});

        if (messageData.data)
            return await messageData.delete(messageInfo);
        return 0;
    }
    client.getLikeMessage = async (likeInfo) => {
        return await LikesMessage.findOne(likeInfo);
    }
    client.addLikeMessage = async (likeInfo) => {
        return await LikesMessage.save(likeInfo);
    }
    client.removeLikeMessage = async (likeInfo) => {
        return await LikesMessage.delete(likeInfo);
    }
    client.createPublication = async (publicationInfo) => {
        return await Publication.save(publicationInfo);
    }
}