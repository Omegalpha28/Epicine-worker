const { error } = require("../../utils/Logger");
const {User} = require("./models");

module.exports = client => {
    client.getUser = async (userInfo) => {
        const userData = await User.findOne(userInfo);
        return userData;
    }

    client.createUser = async (name, email, mdp) => {
        try {
            const result = await User.save({ name: name, email: email, password: mdp });
            return result;
        } catch (err) {
            error(err);
            return 0;
        }
    }

    client.updateUser = async (user, settings) => {
        let userData = await client.getUser({id: user});
        if (typeof userData.data != "object") userData.data = {};

        return userData.updateOne(settings);
    }
}