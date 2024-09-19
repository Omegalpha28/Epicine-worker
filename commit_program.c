#include <ncurses.h>
#include <stdlib.h>
#include <string.h>

#define MAX_DESC 256
#define MAX_BRANCH 64

void get_input(WINDOW *win, char *str, int n);
int choose_commit_type(WINDOW *menu_win, char *types[], int n_types);

int main() {
    // Initialisation de ncurses
    initscr();
    noecho();
    cbreak();
    keypad(stdscr, TRUE);

    char *types[] = {"ADD", "UPDATE", "FIX", "PATCH"};
    int n_types = sizeof(types) / sizeof(types[0]);
    char description[MAX_DESC] = {0};
    char branch[MAX_BRANCH] = {0};
    int highlight = 0;

    // Créer une fenêtre principale
    WINDOW *main_win = newwin(10, 50, 1, 1);
    box(main_win, 0, 0);
    keypad(main_win, TRUE);

    // Étape 1 : Choisir le type de commit
    highlight = choose_commit_type(main_win, types, n_types);

    // Effacer et réutiliser la même fenêtre
    wclear(main_win);
    box(main_win, 0, 0);
    mvwprintw(main_win, 1, 1, "Enter commit description:");
    wrefresh(main_win);
    get_input(main_win, description, MAX_DESC);

    // Effacer et réutiliser la même fenêtre
    wclear(main_win);
    box(main_win, 0, 0);
    mvwprintw(main_win, 1, 1, "Enter branch name:");
    wrefresh(main_win);
    get_input(main_win, branch, MAX_BRANCH);

    // Effacer et réutiliser la même fenêtre pour la confirmation
    wclear(main_win);
    box(main_win, 0, 0);
    mvwprintw(main_win, 1, 1, "Do you want to push the commit? (y/n):");
    wrefresh(main_win);
    
    char confirm = wgetch(main_win);

    // Terminer ncurses
    endwin();

    // Si confirmé, exécuter la commande Git
    if (confirm == 'y' || confirm == 'Y') {
        char command[512];
        snprintf(command, sizeof(command), "git commit -m \"%s: %s\" && git push origin %s", types[highlight], description, branch);
        system(command);
    } else {
        printf("Commit process canceled.\n");
    }

    return 0;
}
// Fonction pour obtenir une entrée utilisateur
void get_input(WINDOW *win, char *str, int n) {
    echo();
    wgetnstr(win, str, n);
    noecho();
}

// Fonction pour afficher le menu et permettre à l'utilisateur de sélectionner un type de commit
int choose_commit_type(WINDOW *menu_win, char *types[], int n_types) {
    int choice = 0;
    int highlight = 0;

    while (1) {
        // Afficher les éléments du menu avec la sélection
        for (int i = 0; i < n_types; i++) {
            if (i == highlight)
                wattron(menu_win, A_REVERSE);
            mvwprintw(menu_win, i + 1, 1, types[i]);
            wattroff(menu_win, A_REVERSE);
        }
        choice = wgetch(menu_win);

        // Navigation dans le menu
        switch (choice) {
            case KEY_UP:
                highlight = (highlight - 1 + n_types) % n_types;
                break;
            case KEY_DOWN:
                highlight = (highlight + 1) % n_types;
                break;
            case 10: // Touche entrée pour sélectionner
                return highlight;
        }
        wrefresh(menu_win);
    }
}