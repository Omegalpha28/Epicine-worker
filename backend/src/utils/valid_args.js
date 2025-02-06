const { validate } = require("email-validator");

function validUserArgs(res, mail, name, mdp)
{
    let return_value = 0;

    if (mail == undefined || name == undefined || mdp == undefined)
        res.status(400).json({"msg":"there is information missing"});
    else if (mail.length === 0 || name.length === 0)
        res.status(400).json({"msg": "email, name and password is required"});
    else if (!validate(mail))
        res.status(400).json({"msg": "Email is not valid"});
    else if (name == mdp || mail == mdp)
        res.status(400).json({"msg": "The password must be different from the name and email"});
    else if (mdp.length < 8)
        res.status(400).json({"msg": "Password must contain at least 8 characters"});
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,}$/.test(mdp))
        res.status(400).json({"msg": "Password must contain lower case, upper case, number and special characters"});
    else
        return_value = 1;
    return return_value;
}

module.exports = { validUserArgs }