/**
 * Récupère les informations de l'utilisateur en fonction du client
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param userInfo Les information de l'utilisateur
 * @returns {Promise<ModelInstance|number>} Les informations de l'utilisateur
 */
declare async function getUser(client: object, userInfo: any[]): Promise<any>;

/**
 * Crée un utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param name Le nom de l(utilisateur
 * @param email l'email de l'utilisateur
 * @param mdp le mot de passe de l'utilisateur
 * @returns {Promise<Object>} Les informations de l'utilisateur
 * @throws {Error} Si une erreur survient
 */
declare async function createUser(client: object, name: string, email: string, mdp: string): Promise<number | Error>;

/**
 * Mes à jour les paramètres de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param uuid L'identifiant de l'utilisateur
 * @param settings Les paramètres de l'utilisateur à mettre à jour
 * @returns Promise<number>
 * @throws {Error} Si une erreur survient
 */
declare async function updateUser(client: object, uuid: string, settings: (string | number)[]): Promise<number | Error>;

/**
 * Récupère le premier favoris de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param favInfo Les informations des favoris de l'utilisateur
 * @returns {Promise<ModelInstance|number>} Les informations de l'utilisateur
 */
declare async function getFavoriteUnique(client: object, favInfo: (string | number)[]): Promise<ModelInstance|number>;

/**
 * Récupère les favoris de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param favInfo Les informations des favoris de l'utilisateur
 * @returns {Promise<ModelInstance|number>} Les favoris de l'utilisateur
 */
declare async function getFavorite(client: object, favInfo: (string | number)[]): Promise<ModelInstance|number>;

/**
 * Ajoute un favoris à l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param uuid identifiant de l'utilisateur
 * @param film_id indentifiant du film
 * @returns {Promise<Object>} Les informations de l'utilisateur
 * @throws {Error} Si une erreur survient
 */
declare async function addFavorite(client: object, uuid: string, film_id: number): Promise<Object>

/**
 * Supprime un favoris à l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param uuid identifiant de l'utilisateur
 * @param film_id indentifiant du film
 * @returns {Promise<ModelInstance|number>} Les favoris de l'utilisateur supprimer
 */
declare async function removeFavorite(client: object, uuid: string, film_id: number): Promise<ModelInstance|number>

/**
 * Récupère un élément de la liste de lecture de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param watchInfo Les informations de la liste de lecture de l'utilisateur
 * @returns {Promise<ModelInstance|number>} Les favoris de l'utilisateur
 */
declare async function getWatchListUnique(client: object, watchInfo): Promise<ModelInstance|number>

/**
 * Ajoute un élément à la liste de lecture de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param uuid identifiant de l'utilisateur
 * @param film_id indentifiant du film
 * @returns {Promise<Object>} Les informations de la liste de lecture de l'utilisateur
 * @throws {Error} Si une erreur survient
 */
declare async function addWatchList(client: object, uuid: string, film_id: number): Promise<Object>

/**
 * Supprime un élément de la liste de lecture de l'utilisateur en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param uuid identifiant de l'utilisateur
 * @param film_id indentifiant du film
 * @returns {Promise<ModelInstance|number>} La liste de lecture de l'utilisateur supprimer
 */
declare async function removeWatchList(client: object , uuid: string, film_id: number);

/**
 * Récupère les fils les plus populaires
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @returns {Promise<ModelInstance|number>} Les fils les plus populaires
 */
declare async function getFilPopular(client: object ): Promise<ModelInstance|number>;

/**
 * Récupère les informations du fil en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param filInfo les informations du fil à mettre à jour
 */
declare async function getFil(client: object, filInfo: (string | number)[]): Promise<ModelInstance|number>;
/**
 * Met à jour les informations du fil en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param filInfo les informations du fil à mettre à jour
 * @returns Promise<number>
 * @throws {Error} Si une erreur survient
 */
declare async function updateFil(client: object , filInfo: (string | number)[]): Promise<number | Error>;
/**
 * Récupère les premières informations du like en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param likeInfo les informations du like
 */
declare async function getLikeUnique(client: object, likeInfo: (string)[]): Promise<ModelInstance|number>;
/**
 * Récupère les informations du like en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param likeInfo les informations du like
 */
declare async function getLike(client: object, likeInfo: (string)[]): Promise<ModelInstance|number>;
/**
 * Ajoute un like en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param likeInfo les informations du like
 */
declare async function addLike(client: object, likeInfo: (string)[]): Promise<Object>
/**
 * Supprime un like en fonction des informations fournies
 * @param client Le module client est un objet utilisé pour stocker des fonctions. Il sert de conteneur centralisé pour diverses fonctions qui peuvent être utilisées dans différentes parties de l'application.
 * @param likeInfo les informations du like
 */
declare async function removeLike(client: object, likeInfo: (string)[]): Promise<ModelInstance|number>
export { getUser, createUser, updateUser, getFavoriteUnique, getFavorite, addFavorite, removeFavorite, getWatchListUnique, addWatchList, removeWatchList, getFilPopular, getFil, updateFil, getLikeUnique, getLike, addLike, removeLike };