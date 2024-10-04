module.exports = {getUser, createUser, updateUser, getTv};

async function getUser(client, userInfo){return await client.getUser(userInfo);}
async function createUser(client, name, email, mdp){return await client.createUser(name, email, mdp);}
async function updateUser(client, uuid, settings){return await client.updateUser(uuid, settings);}
async function getTv(client, tvInfo){return await client.getTv(tvInfo);}