module.exports = {getUser, createUser, updateUser, getFavorite, addFavorite, removeFavorite};

async function getUser(client, userInfo){return await client.getUser(userInfo);}
async function createUser(client, name, email, mdp){return await client.createUser(name, email, mdp);}
async function updateUser(client, uuid, settings){return await client.updateUser(uuid, settings);}
async function getFavorite(client, favInfo){return client.getFavorite(favInfo);}
async function addFavorite(client, uuid, film_id){return client.addFavorite(uuid, film_id);}
async function removeFavorite(client, uuid, film_id){return client.removeFavorite(uuid, film_id);}