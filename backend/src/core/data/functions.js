const {User} = require("./models");

module.exports = client => {
    client.getUser = async userId => {
        const userData = await User.findOne({id: userId});
        return userData;
    }
}