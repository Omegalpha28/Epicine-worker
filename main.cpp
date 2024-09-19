#include <SFML/Graphics.hpp>
#include <iostream>
#include <cstdlib>
#include <vector>

// Fonction pour exécuter des commandes système
void executeCommand(const std::string& command) {
    system(command.c_str());
}

int main() {
    // Création de la fenêtre SFML
    sf::RenderWindow window(sf::VideoMode(800, 600), "Git Push Interface");

    // Variables pour le type de commit, description et branche
    std::string commitType = "ADD";
    std::string description = "";
    std::string branch = "main";

    // Liste des options pour le type de commit
    std::vector<std::string> commitTypes = {"ADD", "UPDATE", "FIX", "PATCH"};
    int selectedType = 0;

    // Font pour le texte (assurez-vous d'avoir une police de caractère dans le dossier de projet)
    sf::Font font;
    if (!font.loadFromFile("arial.ttf")) {
        return -1;
    }

    // Textes à afficher
    sf::Text commitTypeText("Commit Type: " + commitTypes[selectedType], font, 20);
    commitTypeText.setPosition(50, 50);

    sf::Text descriptionText("Description: " + description, font, 20);
    descriptionText.setPosition(50, 150);

    sf::Text branchText("Branch: " + branch, font, 20);
    branchText.setPosition(50, 250);

    sf::Text pushText("Push", font, 30);
    pushText.setPosition(350, 400);

    // Variables de saisie de texte
    bool enteringDescription = false;
    bool enteringBranch = false;

    // Boucle principale
    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }

            // Gestion des événements clavier
            if (event.type == sf::Event::KeyPressed) {
                if (enteringDescription || enteringBranch) {
                    // Capture du texte saisi pour la description ou la branche
                    if (event.key.code == sf::Keyboard::BackSpace) {
                        if (enteringDescription && !description.empty()) {
                            description.pop_back();
                        } else if (enteringBranch && !branch.empty()) {
                            branch.pop_back();
                        }
                    }
                }
            } else if (event.type == sf::Event::TextEntered) {
                if (enteringDescription) {
                    if (event.text.unicode < 128 && event.text.unicode != '\b') {
                        description += static_cast<char>(event.text.unicode);
                    }
                } else if (enteringBranch) {
                    if (event.text.unicode < 128 && event.text.unicode != '\b') {
                        branch += static_cast<char>(event.text.unicode);
                    }
                }
            }

            // Sélection du commit type
            if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Up) {
                selectedType = (selectedType - 1 + commitTypes.size()) % commitTypes.size();
                commitType = commitTypes[selectedType];
            }
            if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Down) {
                selectedType = (selectedType + 1) % commitTypes.size();
                commitType = commitTypes[selectedType];
            }

            // Gestion de la souris pour détecter le clic sur le bouton de push
            if (event.type == sf::Event::MouseButtonPressed) {
                if (event.mouseButton.button == sf::Mouse::Left) {
                    sf::Vector2i mousePos = sf::Mouse::getPosition(window);

                    // Détection du clic sur le bouton "Push"
                    if (pushText.getGlobalBounds().contains(mousePos.x, mousePos.y)) {
                        // Construction du message de commit
                        std::string commitMessage = "[" + commitType + "]: " + description;

                        // Exécution des commandes Git
                        executeCommand("git add .");
                        executeCommand("git commit -m \"" + commitMessage + "\"");
                        executeCommand("git push");
                        std::cout << "Push effectué sur la branche " << branch << " avec le message: " << commitMessage << std::endl;
                    }

                    // Détection du clic sur la zone de texte "Description"
                    if (descriptionText.getGlobalBounds().contains(mousePos.x, mousePos.y)) {
                        enteringDescription = true;
                        enteringBranch = false;
                    }

                    // Détection du clic sur la zone de texte "Branch"
                    if (branchText.getGlobalBounds().contains(mousePos.x, mousePos.y)) {
                        enteringBranch = true;
                        enteringDescription = false;
                    }
                }
            }
        }

        // Mise à jour des textes
        commitTypeText.setString("Commit Type: " + commitTypes[selectedType]);
        descriptionText.setString("Description: " + description);
        branchText.setString("Branch: " + branch);

        // Affichage
        window.clear();
        window.draw(commitTypeText);
        window.draw(descriptionText);
        window.draw(branchText);
        window.draw(pushText);
        window.display();
    }

    return 0;
}
