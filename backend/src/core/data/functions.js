const { logs, error } = require("../../utils/Logger");
const {User} = require("./models");

module.exports = client => {
    client.getUser = async userId => {
        const userData = await User.findOne({id: userId});
        return userData;
    }

    client.createUser = async (name, email, birthday) => {
        User.save({name: name, email: email, birthday:birthday}).then(g => {
            logs("Nouvelle utilisateur");
        }).catch((err) => {
            error(err);
            return;
        })
    }

    client.updateUser = async (user, settings) => {
        let userData = await client.getUser(user);
        if (typeof userData.data != "object") userData.data = {};

        return userData.updateOne(settings);
    }
}