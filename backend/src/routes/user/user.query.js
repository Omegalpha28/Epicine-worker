const jwt = require("jsonwebtoken");
const { createUser, getUser } = require("../../core/data/config.function");
const { logs } = require("../../utils/Logger");

module.exports = { checkAccountMail, register, getAccountMail }

async function checkAccountMail(client, res, email, callback)
{
    const userData = await getUser(client, {email: email});

    if (userData.data == undefined)
        callback(0);
    else
        callback(84);
}

async function register(client, res, email, name, mdp)
{
    try {
        const result = await createUser(client, name, email, mdp);
        
        res.status(201).json({token: jwt.sign({id: result[0].insertId}, process.env.SECRET)});
    } catch (error) {
        error(err);
        res.status(500).json({"msg": "Internal server error"});
    }
}

async function getAccountMail(client, res, email, mdp, bcrypt, callback)
{
    const userData = (await getUser(client, {email: email})).data;

    if (userData == undefined)
        callback(84);
    else {
        var mdp2 = userData.password;

        if (bcrypt.compareSync(mdp, mdp2)) {
            const token = jwt.sign({id:userData.id}, process.env.SECRET);

            res.json({token});
            callback(0);
        }
        else
            callback(84);
    }
}
