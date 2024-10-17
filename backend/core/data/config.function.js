async function getUser(client, userInfo){return await client.getUser(userInfo);}
async function createUser(client, name, email, mdp){return await client.createUser(name, email, mdp);}
async function updateUser(client, uuid, settings){return await client.updateUser(uuid, settings);}
async function getFavoriteUnique(client, favInfo){return await client.getFavoriteUnique(favInfo);}
async function getFavorite(client, favInfo){return await client.getFavorite(favInfo);}
async function addFavorite(client, uuid, item_id, type, is_view){return await client.addFavorite(uuid, item_id, type, is_view);}
async function removeAllFavorite(client, uuid){return await client.removeAllFavorite(uuid);}
async function removeFavorite(client, uuid, item_id){return await client.removeFavorite(uuid, item_id);}
async function getWatchListUnique(client, watchInfo){return await client.getWatchListUnique(watchInfo);}
async function getWatchList(client, watchInfo){return await client.getWatchList(watchInfo);}
async function addWatchList(client, uuid, item_id){return await client.addWatchList(uuid, item_id);}
async function removeAllWatchList(client, uuid){return await client.removeAllWatchList(uuid);}
async function removeWatchList(client, uuid, item_id){return await client.removeWatchList(uuid, item_id);}
async function getFilPopular(client){return await client.getFilPopular();}
async function getFil(client, filInfo){return await client.getFil(filInfo);}
async function updateFil(client, auteur, filInfo){return await client.updateFil(auteur, filInfo);}
async function getLikeUnique(client, likeInfo){return await client.getLikeUnique(likeInfo);}
async function getLike(client, likeInfo){return client.getLike(likeInfo);}
async function addLike(client, likeInfo){return client.addLike(likeInfo);}
async function removeLike(client, likeInfo){return client.removeLike(likeInfo);}
async function getMessageUnique(client, messageInfo){return client.getMessageUnique(messageInfo);}
async function getMessage(client, messageInfo){return client.getMessage(messageInfo);}
async function addMessage(client, messageInfo){return client.addMessage(messageInfo);}
async function updateMessage(client, auteur, messageInfo){return client.updateMessage(auteur, messageInfo);}
async function removeMessage(client, messageInfo){return client.removeMessage(messageInfo);}
async function getLikeMessage(client, likeInfo){return client.getLikeMessage(likeInfo);}
async function addLikeMessage(client, likeInfo){return client.addLikeMessage(likeInfo);}
async function removeLikeMessage(client, likeInfo){return client.removeLikeMessage(likeInfo);}
module.exports = {getUser, createUser, updateUser, getFavoriteUnique, getFavorite, addFavorite, removeAllFavorite, removeFavorite, getWatchListUnique, getWatchList, addWatchList, removeAllWatchList, removeWatchList, getFilPopular, getFil, updateFil, getLikeUnique, getLike, addLike, removeLike, getMessageUnique, getMessage, addMessage, updateMessage, removeMessage, getLikeMessage, addLikeMessage, removeLikeMessage};