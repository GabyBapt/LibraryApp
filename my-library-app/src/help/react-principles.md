# Principes Fondamentaux de React

Ce document sert de guide pour comprendre et appliquer les principes de base de React. L'objectif est de construire des applications robustes, maintenables et performantes.

---

### 1. Architecture Basée sur les Composants (Component-Based Architecture)

**Qu'est-ce que c'est ?**
L'interface utilisateur (UI) est décomposée en morceaux indépendants et réutilisables appelés **composants**. Chaque composant gère son propre état et son propre rendu. Pensez-y comme à des briques de Lego que vous assemblez pour construire votre application.

**Comment les utiliser ?**
Créez des fonctions qui retournent du JSX (une syntaxe qui ressemble à du HTML).

```jsx
// Un composant simple qui affiche un titre
function WelcomeMessage({ userName }) {
  return <h1>Bonjour, {userName} !</h1>;
}

// Utilisation dans un autre composant
function App() {
  return <WelcomeMessage userName="Alice" />;
}
```

**Quand les privilégier ?**
**Toujours.** C'est le principe central de React. Dès qu'une partie de votre UI devient complexe ou se répète, créez un composant.

*   **Petits composants** : Plus un composant est petit et spécialisé, plus il est facile à comprendre, à tester et à réutiliser.
*   **Composants "conteneurs" vs. "présentation"** :
    *   **Conteneurs** : Gèrent la logique et l'état (ex: `LibraryContent.jsx` qui récupère les livres).
    *   **Présentation** : Se contentent d'afficher des données reçues via les `props` (ex: `BookTile.jsx`).

---

### 2. UI Déclarative et Flux de Données Unidirectionnel

**Qu'est-ce que c'est ?**
Vous "déclarez" à quoi l'interface doit ressembler pour un état donné, et React se charge de mettre à jour le DOM efficacement. Les données ne circulent que dans un seul sens : du parent vers l'enfant.

**Comment ça marche ?**
*   **State (`useState`)** : C'est l'état **interne** et **modifiable** d'un composant. Utilisez-le pour les données qui changent avec les interactions de l'utilisateur (ex: un champ de formulaire, l'ouverture/fermeture d'un modal).
*   **Props (Propriétés)** : C'est la manière de passer des données **immuables** d'un composant parent à un composant enfant. L'enfant ne doit jamais modifier ses propres props.
*   **Flux Unidirectionnel** : Si un enfant a besoin de modifier une donnée du parent, le parent lui passe une **fonction** en prop.

```jsx
// Parent
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Le parent passe la valeur ET la fonction pour la modifier */}
      <SearchBar term={searchTerm} onTermChange={setSearchTerm} />
      <Results list={filterResults(searchTerm)} />
    </div>
  );
}

// Enfant
function SearchBar({ term, onTermChange }) {
  // L'enfant utilise la fonction du parent pour remonter le changement
  return (
    <input
      value={term}
      onChange={(e) => onTermChange(e.target.value)}
    />
  );
}
```

**Quand privilégier ce modèle ?**
**Toujours.** Ce modèle rend le code prévisible. Quand un bug survient, vous savez que la source du problème se trouve soit dans le composant lui-même (son état), soit dans le composant parent qui lui a passé des données incorrectes.

> **💡 Astuce pour les actions multiples (ex: Modifier/Supprimer) :**
> Souvent, une liste d'éléments aura plusieurs actions possibles. La meilleure pratique est de créer un composant dédié pour ces actions et de lui passer les fonctions nécessaires en props.
>
> ```jsx
> // Parent qui contient la logique
> function ItemList() {
>   const [items, setItems] = useState([ {id: 1, text: "Premier"} ]);
>
>   const handleEdit = (itemId) => {
>     console.log("Modifier l'item :", itemId);
>     // Mettre ici la logique pour ouvrir un modal de modification
>   };
>
>   const handleDelete = (itemId) => {
>     setItems(prevItems => prevItems.filter(item => item.id !== itemId));
>   };
>
>   return (
>     <ul>
>       {items.map(item => (
>         <li key={item.id}>
>           {item.text}
>           {/* On passe les fonctions qui savent quel item cibler */}
>           <ItemActions
>             onEdit={() => handleEdit(item.id)}
>             onDelete={() => handleDelete(item.id)}
>           />
>         </li>
>       ))}
>     </ul>
>   );
> }
>
> // Enfant, purement présentationnel
> function ItemActions({ onEdit, onDelete }) {
>   return (
>     <>
>       <button onClick={onEdit}>Modifier</button>
>       <button onClick={onDelete}>Supprimer</button>
>     </>
>   );
> }
> ```

---

### 3. Les Hooks

**Qu'est-ce que c'est ?**
Les Hooks sont des fonctions (ex: `useState`, `useEffect`, `useContext`) qui vous permettent de vous "brancher" sur les fonctionnalités de React depuis un composant fonctionnel, comme la gestion de l'état ou du cycle de vie.

**Les Hooks essentiels :**

*   **`useState`**
    *   **Usage** : Gérer l'état local d'un composant.
    *   **Quand** : Pour toute donnée qui change au fil du temps à l'intérieur d'un seul composant (valeur d'un input, état d'une case à cocher, etc.).

*   **`useEffect`**
    *   **Usage** : Gérer les "effets de bord" (side effects). Ce sont des opérations qui se produisent en dehors du flux de rendu normal, comme les appels API, les abonnements, ou la manipulation directe du DOM.
    *   **Quand** :
        *   `useEffect(() => { ... }, [])` : Pour exécuter une action une seule fois, au montage du composant (ex: charger des données initiales).
        *   `useEffect(() => { ... }, [dependency])` : Pour exécuter une action à chaque fois qu'une dépendance (une prop ou un état) change.

*   **`useContext`**
    *   **Usage** : Partager un état global à travers plusieurs composants sans avoir à passer les props à chaque niveau ("prop drilling").
    *   **Quand** : Pour des données globales comme l'utilisateur connecté, le thème (clair/sombre), ou, comme dans ce projet, l'état central des livres (`BookContext`). À utiliser avec modération pour ne pas rendre les composants moins réutilisables.

---

### Résumé des Bonnes Pratiques

1.  **Décomposer l'UI** : Créez de nombreux petits composants spécialisés.
2.  **Gérer l'état au bon endroit** : L'état doit vivre dans le plus proche ancêtre commun des composants qui en ont besoin.
3.  **Flux de données clair** : Les données descendent, les événements (via des fonctions) remontent.
4.  **Utiliser les Hooks** : Privilégiez les composants fonctionnels avec des Hooks pour la logique et l'état.
5.  **Penser en "état"** : Au lieu de penser "comment vais-je changer l'UI ?", pensez "quel est l'état qui produit cette UI ?".

