const { logs } = require("../../../utils/Logger");
const auth = require("../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.get("/create/request_token", auth, async (req, res) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TOKEN}`,
            },
        }
        try {
            const response = await fetch("https://api.themoviedb.org/3/authentication/token/new", options);

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            else {
                const responseJson = await response.json();
                res.status(200).json();
            }
        }
        catch (err) {
            logs(err);
            res.status(500).send({ error: "Internal server error" });
        }
    })
}