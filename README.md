# API de Justification de Texte

Ce projet est une API Node.js/TypeScript permettant de justifier un texte brut à 80 caractères par ligne. Elle inclut un système d'authentification par token et une gestion de quota quotidien.

## 🚀 Fonctionnalités

*   **Justification de texte** : Aligne le texte à gauche et à droite (80 caractères de large) en répartissant intelligemment les espaces entre les mots.
*   **Système de Token** : Génération d'un token unique via une adresse email.
*   **Gestion de Quota** : Limite de 80 000 mots par jour et par token.
*   **Architecture Propre** : Séparation des routes et de la logique métier (services).

## 🛠️ Installation et Lancement

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```

2.  **Lancer le serveur** :
    ```bash
    npx ts-node src/server.ts
    ```
    *Le serveur sera accessible sur `http://localhost:3000`.*

## 📌 Utilisation de l'API

### 1. Obtenir un Token
**POST** `/api/token`  
*Corps (JSON) :*
```json
{
  "email": "votre@email.com"
}
```

### 2. Justifier du texte
**POST** `/api/justify`

*   **Headers** : 
    *   `Authorization: Bearer <votre_token>`
    *   `Content-Type: text/plain`
*   **Corps** : Envoyer le texte brut à justifier (chaîne de caractères).
*   **Réponse** : Retourne le texte formaté avec une largeur maximale de 80 caractères par ligne.

---

## 📂 Structure du projet

L'architecture suit une séparation stricte entre la gestion des requêtes et la logique métier :

*   **`src/server.ts`** : Point d'entrée de l'application. Initialise le serveur HTTP et écoute les requêtes entrantes.
*   **`src/route.ts`** : Gestionnaire des routes (Handler). Analyse l'URL et la méthode (GET/POST) pour diriger la requête vers le bon traitement.
*   **`src/types.ts`** : Définitions des interfaces et types TypeScript pour assurer la cohérence des données (ex: interface `User`).
*   **`src/services/`** : Contient la logique métier réutilisable.
    *   **`justifyServices.ts`** : Cœur de l'application. Contient l'algorithme de justification ligne par ligne et la fonction de comptage de mots.
    *   **`userServices.ts`** : Gère la persistance temporaire des utilisateurs, la création de nouveaux comptes et la validation des tokens.

## 📝 Algorithme de justification

L'algorithme repose sur une approche de "distribution dynamique" pour garantir un bloc de texte homogène :

1.  **Découpage** : Le texte d'entrée est nettoyé de ses espaces superflus et transformé en un tableau de mots individuels.
2.  **Accumulation** : Les mots sont ajoutés un par un à une "ligne temporaire" tant que la somme de leurs caractères (incluant un espace par défaut) ne dépasse pas la limite stricte de **80 caractères**.
3.  **Distribution des espaces** : Lorsqu'un mot ferait dépasser cette limite :
    *   Le programme calcule le nombre d'espaces manquants pour atteindre exactement 80.
    *   Ces espaces sont injectés un par un entre les mots de la ligne (en partant de la gauche vers la droite).
    *   Si le besoin en espaces est important, l'algorithme effectue plusieurs passages pour les répartir équitablement.
4.  **Cas particuliers** : 
    *   Si une ligne ne contient qu'un seul mot très long, elle est complétée par des espaces à droite (`padEnd`).
    *   La toute dernière ligne du texte n'est pas forcée à 80 caractères (alignement à gauche standard) pour respecter les conventions typographiques.# tictactrip
