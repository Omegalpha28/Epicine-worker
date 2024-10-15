const jwt = require('jsonwebtoken');
const { User } = require('../../../core/data/models');

module.exports = function (req, res, next) {
    const headersauth = req.headers['authorization'];

    if (!headersauth || headersauth.length == 0)
        return res.status(401).json({"msg":"No token, authorization denied"});
    const token = headersauth.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, async (err, result) => {
        if (err || !(await User.count({uuid: result["uuid"]})).data[0].count)
            return res.status(401).json({"msg":"Token is not valid"});
        req.uuiduser = result["uuid"];
        next();
    });
}
