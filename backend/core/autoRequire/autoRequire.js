const fs = require('fs');
const path = require('path'); // Pour gérer les chemins de fichiers

module.exports = (dirPath, args) => {
    const absoluteDirPath = path.resolve(dirPath); // Convertir en chemin absolu
    fs.readdir(absoluteDirPath, (err, files) => {
        if (err) return console.error(`Erreur lors de la lecture du dossier: ${err}`);
        files.forEach(file => {
            const modulePath = path.join(absoluteDirPath, file);
            try {
                const module = require(modulePath);
                module(...args); // Passer les arguments dynamiquement
            } catch (err) {
                console.error(`Erreur lors du chargement du module ${modulePath}: ${err.message}`);
            }
        });
    });
}