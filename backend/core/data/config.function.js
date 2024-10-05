module.exports = {getUser, createUser, updateUser, getFavorite, addFavorite, removeFavorite, getWatchList, addWatchList, removeWatchList};

async function getUser(client, userInfo){return await client.getUser(userInfo);}
async function createUser(client, name, email, mdp){return await client.createUser(name, email, mdp);}
async function updateUser(client, uuid, settings){return await client.updateUser(uuid, settings);}
async function getFavorite(client, favInfo){return await client.getFavorite(favInfo);}
async function addFavorite(client, uuid, film_id){return await client.addFavorite(uuid, film_id);}
async function removeFavorite(client, uuid, film_id){return await client.removeFavorite(uuid, film_id);}
async function getWatchList(client, watchInfo){return await client.getWatchList(watchInfo);}
async function addWatchList(client, uuid, film_id){return await client.addWatchList(uuid, film_id);}
async function removeWatchList(client, uuid, film_id){return await client.removeWatchList(uuid, film_id);}