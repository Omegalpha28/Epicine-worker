const fs = require('fs');
const { logs, error } = require('../../../utils/Logger');

/**
 * @param {Path} filename 
 * @returns 
 */
function LoadJSON(filename = "")
{
    return JSON.parse(fs.existsSync(filename) ? fs.readFileSync(filename).toString() : false);
}

/**
 * @param {Path} filename 
 * @param {Array} json 
 * @param {Encoding} options 
 */
function AppendJSONSync(filename = "", json = '""', options = undefined)
{
    fs.appendFileSync(filename, JSON.parse(json), options);
}

/**
 * @param {Path} filename 
 * @param {Array} json 
 */
function AppendJSON(filename = "", json = '""')
{
    fs.appendFile(filename, JSON.stringify(json, null, "\t"), (err) => {
        if(err) return error(`Une erreur est survenue lors de la sauvegarde du fichier\n${err}`);
        logs("Le fichier a bien reçu les modifications qui lui ont étaient apporté");
    })
}

/**
 * @param {Path} filename 
 * @param {Array} json 
 * @param {Encoding} options 
 */
function SaveJSONSync(filename = "", json = '""', options = undefined)
{
    fs.writeFileSync(filename, JSON.stringify(json, null, "\t"), options);
}

/**
 * @param {Path} filename 
 * @param {Array} json
 */function SaveJSON(filename = "", json = '""')
{
    fs.writeFile(filename, JSON.stringify(json, null, "\t"), (err) => {
        if(err) return error(`Une erreur est survenue lors de la sauvegarde du fichier\n${err}`);
        logs("Le fichier a bien était enregisté");
    });
}

module.exports = { LoadJSON, AppendJSON, AppendJSONSync, SaveJSON, SaveJSONSync };