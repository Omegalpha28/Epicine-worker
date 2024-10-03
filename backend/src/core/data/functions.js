const { error } = require("../../utils/Logger");
const {User, Tv} = require("./models");


module.exports = client => {
    client.getUser = async (userInfo) => {
        console.log("getUser", userInfo);
        
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
            console.log("createUser", result);
            
            return result;
        } catch (err) {
            error(err);
            return 0;
        }
    }

    client.updateUser = async (uuid, settings) => {
        console.log("updateUser", uuid, settings);
        
        let userData = await client.getUser({uuid: uuid});

        if (typeof userData.data != "object") userData.data = {};

        return userData.updateOne(settings);
    }

    client.getTv = async (tvInfo) => {
        const tvData = await Tv.findOne(tvInfo);
        return tvData;
    };
}