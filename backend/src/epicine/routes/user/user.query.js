const jwt = require("jsonwebtoken");
const { createUser, getUser, updateUser } = require("../../../core/data/config.function");
const { error } = require("../../../utils/Logger");

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
        const token = jwt.sign({uuid: result.uuid}, process.env.SECRET);
        
        res.status(201).json({token: token});
    } catch (err) {
        error(err);
        res.status(500).json({"msg": "Internal server error"});
    }
}

async function getAccountMail(client, res, email, mdp, bcrypt, callback)
{
    const userData = (await getUser(client, {email: email})).data;

    if (userData == undefined || userData.status == -1)
        callback(84);
    else {
        var mdp2 = userData.password;

        if (bcrypt.compareSync(mdp, mdp2)) {
            const token = jwt.sign({uuid:userData.uuid}, process.env.SECRET);

            res.json({token});
            callback(0);
        }
        else
            callback(84);
    }
}

async function checkMdp(client, res, email, mdp, bcrypt)
{
    const userData = (await getUser(client, {email: email})).data;

    if (userData == undefined)
        return 0;
    var mdp2 = userData.password;

    if (bcrypt.compareSync(mdp, mdp2))
        return 1;
    else
        return 0;
}

module.exports = { checkAccountMail, register, getAccountMail, checkMdp }