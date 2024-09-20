const { logs, error } = require("../../utils/Logger");
const {User} = require("./models");

module.exports = client => {
    client.getUserWithId = async userId => {
        const userData = await User.findOne({id: userId});
        return userData;
    }

    client.getUserWithMail = async userMail => {
        const userData = await User.findOne({email: userMail});
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
        let userData = await client.getUserWithId(user);
        if (typeof userData.data != "object") userData.data = {};

        return userData.updateOne(settings);
    }
}