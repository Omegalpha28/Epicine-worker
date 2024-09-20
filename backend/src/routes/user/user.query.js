const jwt = require("jsonwebtoken");
const { getUserWithMail, createUser } = require("../../core/data/config.function");
const { error, logs } = require("../../utils/Logger");

module.exports = { checkAccountMail, register }

function checkAccountMail(client, res, email, callback)
{
    const userData = getUserWithMail(client, email);

    if (Object.keys(userData).length == 0)
        callback(0);
    else
        callback(84);
}

async function register(client, res, email, name, mdp)
{
    try {
        const result = await createUser(client, name, email, mdp);
        res.status(201).json({token: jwt.sign({id: result.insertId}, process.env.SECRET)});
    } catch (error) {
        error(err);
        res.status(500).json({"msg": "Internal server error"});
    }
}