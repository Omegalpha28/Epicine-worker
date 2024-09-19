module.exports = {getUser, createUser, updateUser};

async function getUser(client, userId){return await client.getUser(userId);}
async function createUser(client, name, email, birthday){return await client.createUser(name, email, birthday)}
async function updateUser(client, user, settings){return await client.updateUser(user, settings)}