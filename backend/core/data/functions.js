const { error } = require("../../src/utils/Logger");
const { User, Favorite, Watchlist, Fil, Likes, LikesMovies } = require("./models");


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

    client.addFavorite = async (uuid, film_id) => {
        const favData = (await Favorite.findOne({ userUUID: uuid, film_id: film_id })).data;

        if (!favData)
            return await Favorite.save({ userUUID: uuid, film_id: film_id });
        return 0;
    }

    client.removeFavorite = async (uuid, film_id) => {
        return await Favorite.deleteOne({ userUUID: uuid, film_id: film_id });
    }

    client.getWatchListUnique = async (watchInfo) => {
        return await Watchlist.findOne(watchInfo);
    }

    client.getWatchList = async (watchInfo) => {
        return await Watchlist.find(watchInfo);
    }

    client.addWatchList = async (uuid, film_id) => {
        const watchData = (await Watchlist.findOne({ userUUID: uuid, film_id: film_id })).data;

        if (!watchData)
            return await Watchlist.save({ userUUID: uuid, film_id: film_id });
        return 0;
    }

    client.removeWatchList = async (uuid, film_id) => {
        return await Watchlist.deleteOne({ userUUID: uuid, film_id: film_id });
    }

    client.getFilPopular = async () => {
        return await client.customRequest("SELECT Fil.id,Fil.titre,Fil.description,SUM(IFNULL(Likes.type,0)) AS somme FROM Message LEFT Join Likes ON Likes.id_message=Message.id JOIN Fil ON Fil.id=Message.id_fil GROUP BY Fil.id ORDER BY somme DESC LIMIT 10");
    }

    client.getFil = async (filInfo) => {
        return await Fil.find(filInfo);
    }
    client.updateFil = async (filInfo) => {
        const filData = (await client.getFil({id: filInfo.id, auteur: filInfo.auteur}));

        if (filData.data[0] != undefined)
            delete filData.data[0].date;
        return await filData.updateOne(filInfo);
    }
    client.getLikeUnique = async (likeInfo) => {
        return await LikesMovies.findOne(likeInfo);
    }
    client.getLike = async (likeInfo) => {
        return await LikesMovies.find(likeInfo);
    }
    client.addLike = async (likeInfo) => {
        const likeData = (await client.getLikeUnique(likeInfo)).data;

        if (!likeData)
            return await LikesMovies.save(likeInfo);
        return 0;
    }
}