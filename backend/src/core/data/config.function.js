module.exports = {getUserWithId, getUserWithMail, createUser, updateUser};

async function getUserWithId(client, userId){return await client.getUserWithId(userId);}
async function getUserWithMail(client, userMail){return await client.getUserWithMail(userMail);}
async function createUser(client, name, email, mdp){return await client.createUser(name, email, mdp);}
async function updateUser(client, user, settings){return await client.updateUser(user, settings);}