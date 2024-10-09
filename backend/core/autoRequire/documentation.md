# Documentation du Module `autoRequire`
Le module `autoRequire` permet de charger dynamiquement tous les modules d'un répertoire donné et de leur passer des arguments spécifiques. Cela est particulièrement utile pour initialiser plusieurs modules avec des configurations ou des dépendances communes.
### Déclaration
```javascript
const autoRequire = require('./path/to/autoRequire');
```
### Fonctionnalité
La fonction exportée par le module `autoRequire` prend deux paramètres :
* `dirPath` : Le chemin vers le répertoire contenant les modules à charger.
* `args` : Un tableau d'arguments à passer à chaque module chargé.
### Utilisation
#### Exemple de structure de répertoire
```
project/
|
├── modules/
│   ├── module1.js
│   ├── module2.js
│   └── module3.js
│
└── index.js
```
#### Exemple de code dans index.js
```javascript
const autoRequire = require('autoRequire');
const client = require('client'); // Exemple de client
const app = require('app'); // Exemple d'application

// Charger tous les modules du répertoire 'modules' et leur passer les arguments
autoRequire('./modules', [client, app']);
```

### Gestion des erreurs
Le module `autoRequire` inclut une gestion des erreurs pour :
* La lecture du répertoire : Si une erreur se produit lors de la lecture du répertoire, un message d'erreur est affiché.
* Le chargement des modules : Si une erreur se produit lors du chargement d'un module, un message d'erreur est affiché avec le chemin du module et le message d'erreur.

### Conclusion
Le module `autoRequire` est un outil puissant pour charger dynamiquement des modules et leur passer des arguments spécifiques. En centralisant le chargement des modules et la gestion des erreurs, il simplifie la gestion et l'initialisation des modules dans votre application.