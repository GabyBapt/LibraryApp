# 🗺️ Roadmap du Projet : My Library App

*Dernière mise à jour : Auto-générée suite à notre dernière discussion.*

**Note :** Ce document est un plan de développement vivant. Il sera mis à jour par l'assistant IA pour refléter l'état actuel du projet, les décisions prises et les objectifs futurs.

---

## 🎯 Description du Projet

**My Library App** est une application web personnelle conçue pour aider les utilisateurs à gérer leur bibliothèque de livres. L'objectif est de permettre un suivi simple et efficace des livres lus, en cours de lecture ou à lire.

Les fonctionnalités clés incluent :
- L'ajout de livres (manuellement ou via des services externes comme Google Books).
- L'organisation des livres via un double système :
    1.  **Catégories fixes** (`status`) : "À lire", "En cours", "Terminé".
    2.  **Dossiers personnalisés** (`folder`) : Créés par l'utilisateur pour un rangement thématique.
- Une interface claire pour visualiser et filtrer la bibliothèque.
- (Futur) Des comptes utilisateurs pour une persistance des données en ligne.

---

## 🚀 Plan de Développement

### ✅ Phase 0 : Initialisation et Documentation (Terminée)
- [x] Ajout de commentaires `FEATURE MAP` sur les composants majeurs.
- [x] Création d'une documentation centrale sur les principes de React (`react-principles.md`).
- [x] Création d'un guide de syntaxe (`syntax-guide.md`).

###  PHASE 1 : Refactorisation de l'Architecture (Travail Actuel)

*Objectif : Mettre en place des fondations solides et flexibles pour accueillir les futures fonctionnalités, en se basant sur notre dernière discussion.*

-   [ ] **Séparer les Contextes :**
    -   [ ] Créer un `BookContext.jsx` dédié à la gestion de la liste maîtresse des livres.
    -   [ ] Créer un `FolderContext.jsx` pour la gestion des dossiers personnalisés.
    -   [ ] Imbriquer les `Providers` correctement dans l'application.

-   [ ] **Adapter les Modèles de Données (`models/`) :**
    -   [ ] Assurer que chaque livre possède un `id` unique et stable.
    -   [ ] Le modèle de livre doit clairement distinguer le `status` (catégorie) du `folderId` (dossier optionnel).

-   [ ] **Mettre à jour l'Interface Utilisateur :**
    -   [ ] Modifier `folderList.jsx` pour qu'il affiche les deux types de listes (catégories statiques et dossiers dynamiques).
    -   [ ] Adapter la logique de filtrage principale (probablement dans `App.jsx`) pour gérer les deux types de filtres (`status` ou `folderId`).

### PHASE 2 : API et Persistance des Données (À venir)

*Objectif : Connecter l'application à des services externes et sauvegarder les données de l'utilisateur.*

-   [ ] **Créer une Couche de Services (`services/`) :**
    -   [ ] Isoler toute la logique d'appel API dans ce dossier.
    -   [ ] Créer un service pour l'API Google Books (`googleBooksAPI.js`).
    -   [ ] Créer un service pour la future base de données (`libraryAPI.js`).

-   [ ] **Intégrer l'API Google Books :**
    -   [ ] Permettre l'ajout d'un livre en saisissant son ISBN.
    -   [ ] Pré-remplir le formulaire d'ajout avec les données de l'API.

-   [ ] **Mettre en place la Persistance :**
    -   [ ] Mettre en place une base de données en ligne (ex: Firebase, Supabase...).
    -   [ ] Adapter `libraryAPI.js` pour communiquer avec cette base de données.
    -   [ ] Rendre les contextes asynchrones pour gérer les temps de chargement et les erreurs.

-   [ ] **Gérer les Comptes Utilisateurs :**
    -   [ ] Créer un `AuthContext.jsx` pour l'authentification.
    -   [ ] Créer des pages de connexion et d'inscription.
    -   [ ] Lier les données de la bibliothèque à l'utilisateur connecté.

### PHASE 3 : Améliorations et Finitions (Vision à long terme)

*Objectif : Polir l'application pour offrir une expérience utilisateur de premier ordre.*

-   [ ] **Améliorer l'UX/UI :**
    -   [ ] Ajouter des indicateurs de chargement (spinners) lors des appels réseau.
    -   [ ] Afficher des messages d'erreur clairs et des notifications de succès.
    -   [ ] Améliorer le design des modaux et des formulaires.
    -   [ ] Mettre en place un design "responsive" pour les appareils mobiles.

-   [ ] **Fonctionnalités Additionnelles :**
    -   [ ] Recherche avancée (par année, par note...).
    -   [ ] Permettre à l'utilisateur de noter ses livres.
    -   [ ] Statistiques de lecture (livres lus par mois, etc.).
