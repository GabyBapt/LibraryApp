# Guide de Syntaxe : JavaScript, JSX et React

Ce document est un guide de référence rapide sur la syntaxe utilisée dans un projet React moderne. Il complète le fichier `react-principles.md` en se focalisant sur le "comment écrire" plutôt que sur le "pourquoi faire".

---

### 1. Syntaxe JavaScript Moderne (ES6+)

React tire pleinement parti des fonctionnalités récentes de JavaScript. Voici les plus courantes.

#### `let` et `const`
*   `const` : Déclare une constante. Sa valeur ne peut pas être réaffectée. À utiliser par défaut.
*   `let` : Déclare une variable dont la valeur peut changer.

```javascript
const framework = "React"; // Ne peut pas être changé
let userCount = 10;
userCount = 11; // OK
```

#### Fonctions Fléchées (Arrow Functions)
Une syntaxe plus concise pour déclarer des fonctions.

```javascript
// Fonction traditionnelle
function add(a, b) {
  return a + b;
}

// Fonction fléchée
const add = (a, b) => {
  return a + b;
};

// Si le corps de la fonction ne contient qu'un return, on peut la raccourcir
const addShort = (a, b) => a + b;
```

#### Modules : `import` et `export`
Permettent de diviser le code en plusieurs fichiers.
*   `export default` : Exporte une seule "chose" principale par fichier (souvent un composant).
*   `export` : Exporte plusieurs "choses" nommées.

```javascript
// Dans le fichier 'myComponent.js'
const MyComponent = () => <div>Hello</div>;
export default MyComponent; // Export par défaut

export const utilityFunction = () => { /* ... */ }; // Export nommé

// Dans un autre fichier
import MyComponent, { utilityFunction } from './myComponent.js';
//     ^           ^
//   Défaut      Nommé
```

#### Déstructuration (Destructuring)
Permet d'extraire facilement des valeurs d'objets ou de tableaux.

```javascript
// Pour les objets
const book = { title: "Dune", author: "Frank Herbert" };
const { title, author } = book; // Crée les constantes 'title' et 'author'

// Très utilisé pour les props dans React
function BookCard({ bookData }) {
  const { title, author } = bookData;
  return <div>{title} par {author}</div>;
}

// Pour les tableaux (utilisé par useState)
const [count, setCount] = useState(0); // Extrait les 2 éléments du tableau retourné par useState
```

#### Opérateur de Propagation (Spread Operator `...`)
Permet de "déplier" les éléments d'un objet ou d'un tableau dans un autre. Très utile pour créer des copies ou mettre à jour un état de manière immuable.

```javascript
const originalBook = { title: "Dune", status: "unread" };

// Créer une copie avec une valeur modifiée
const updatedBook = { ...originalBook, status: "reading" };
// updatedBook vaut { title: "Dune", status: "reading" }
```

---

### 2. Syntaxe JSX

JSX est une extension de JavaScript qui permet d'écrire du HTML (ou quelque chose de très similaire) directement dans votre code.

#### Différences avec le HTML
*   `class` devient `className`.
*   `for` (dans les labels) devient `htmlFor`.
*   Les attributs HTML en plusieurs mots sont en `camelCase` (ex: `onclick` -> `onClick`, `tabindex` -> `tabIndex`).

```jsx
// HTML
// <div class="card" onclick="myFunction()">

// JSX
<div className="card" onClick={myFunction}>
```

#### Intégrer du JavaScript avec les accolades `{}`
Vous pouvez insérer n'importe quelle expression JavaScript valide à l'intérieur des accolades.

```jsx
const userName = "Alice";
const element = <h1>Bonjour, {userName} !</h1>; // Affiche "Bonjour, Alice !"

const bookCount = 5;
const readingStatus = <p>Vous lisez {bookCount} livre(s).</p>;
```

#### Les Composants doivent commencer par une Majuscule
C'est ainsi que React fait la différence entre un composant personnalisé et une balise HTML standard.

```jsx
// Incorrect
// const bookTile = ({ book }) => <div>{book.title}</div>;

// Correct
const BookTile = ({ book }) => <div>{book.title}</div>;
```

#### Fragments (`<>...</>`)
Un composant doit retourner un seul élément racine. Si vous voulez en retourner plusieurs, enveloppez-les dans un Fragment.

```jsx
function BookDetails() {
  return (
    <>
      <h2>Titre du livre</h2>
      <p>Auteur</p>
    </>
  );
}
```

---

### 3. Syntaxe spécifique à React

#### Déclaration d'un Composant Fonctionnel
C'est la manière standard de créer un composant : une fonction qui accepte les `props` en argument et retourne du JSX.

```jsx
// Les props sont passées en unique argument (un objet)
function WelcomeMessage({ userName, isLoggedIn }) {
  if (!isLoggedIn) {
    return <p>Veuillez vous connecter.</p>;
  }
  return <h1>Bienvenue, {userName} !</h1>;
}
```

#### Utilisation du Hook `useState`
Il retourne un tableau contenant deux éléments : la valeur actuelle de l'état, et la fonction pour la mettre à jour.

```jsx
import { useState } from 'react';

function Counter() {
  // Déclare une variable d'état 'count' initialisée à 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      {/* Appelle la fonction de mise à jour au clic */}
      <button onClick={() => setCount(count + 1)}>
        Cliquez-moi
      </button>
    </div>
  );
}
```
