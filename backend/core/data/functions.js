const { error } = require("../../src/utils/Logger");
const {User, Favorite, Watchlist} = require("./models");


module.exports = client => {
    client.getUser = async (userInfo) => {
        const userData = await User.findOne(userInfo);
        return userData;
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
        let userData = await client.getUser({uuid: uuid});

        if (typeof userData.data != "object") userData.data = {};
        return userData.updateOne(settings);
    }

    client.getFavorite = async (favInfo) => {
        
        const favData = await Favorite.findOne(favInfo);
        return favData;
    }
    
    client.addFavorite = async (uuid, film_id) => {
        const favData = (await client.getFavorite({userUUID: uuid, film_id: film_id})).data;

        if (!favData)
            return await Favorite.save({userUUID: uuid, film_id: film_id});
        return 0;
    }

    client.removeFavorite = async (uuid, film_id) => {
        return await Favorite.deleteOne({userUUID: uuid, film_id: film_id});
    }

    client.getWatchList = async (watchInfo) => {
        const watchData = await Watchlist.findOne(watchInfo);
        return watchData;
    }

    client.addWatchList = async (uuid, film_id) => {
        const watchData = (await client.getWatchList({userUUID: uuid, film_id: film_id})).data;

        if (!favData)
            return await Watchlist.save({userUUID: uuid, film_id: film_id});
        return 0;
    }
}