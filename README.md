Sure! Here's a README file based on the provided requirements and JSON data:

---

# Application de Gestion d'un Panier d'Articles

## Description

Cette application permet de gérer un panier d'articles avec des fonctionnalités de calcul de taxes, de filtrage par catégorie, et de gestion des quantités. Elle est conçue pour être réactive, modulaire et maintenable.

## Fonctionnalités

### Page Produits

1. **Afficher la liste des articles** :
  - Afficher les informations relatives à l’article (nom produit, catégorie).
  - Calculer et afficher le prix TTC sur chaque carte article (voir section taxes).
  - Filtrer les articles par catégorie.
  - Ajouter un article au panier.
  - Afficher un compteur d’articles ajoutés.
  - Sélectionner la quantité d’articles à ajouter avant d’ajouter l’article au panier.
  - Si l’article n’est plus disponible en stock, afficher « Non disponible ».

### Page Panier

1. **Afficher les articles du panier** avec les informations suivantes :
  - Nom Article
  - Quantité
  - Taxes
  - Prix unitaire HT
  - Prix unitaire TTC
  - Total Taxes
  - Prix total TTC
2. **Gestion du panier** :
  - Pouvoir supprimer un article du panier.
  - Afficher le message « Panier vide » dans le cas où tous les articles du panier sont supprimés.

### Navigation

1. Depuis la page article, accéder au détail du panier en cliquant sur le compteur d’article du panier.
2. Depuis la page panier, pouvoir accéder à la liste des produits.

## Règles Générales

### Responsive

- **Desktop** : 3 cartes par ligne.
- **Mobile** : 1 carte par ligne.

### Taxes

- Aucune taxe n'est appliquée sur les produits de première nécessité (nourriture et médicaments).
- Une taxe sur la valeur ajoutée de 10% est appliquée sur les livres.
- Une taxe sur la valeur ajoutée de 20% est appliquée sur tous les autres produits.
- Une taxe additionnelle de 5% est appliquée sur les produits importés, sans exception.

Le montant de chacune des taxes est arrondi aux 5 centimes supérieurs, selon la règle suivante :

| Taxe calculée | Taxe imputée |
|---------------|--------------|
| 0,99          | 1,00         |
| 1,00          | 1,00         |
| 1,01          | 1,05         |
| 1,02          | 1,05         |

Le montant TTC est calculé comme suit :
\[ P_{ttc} = P_{ht} + \sum(\text{arrondi}(P_{ht} \times t / 100)) \]
- \( P_{ttc} \) : Prix TTC
- \( P_{ht} \) : Prix hors taxes
- \( t \) : taxe applicable

## Données JSON

Les données JSON suivantes servent d'input pour l'application :

```json
[
  {
    "id": 1,
    "productName": "",
    "price": 1.76,
    "quantity": 7,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 14,
    "productName": "Apple - Fuji",
    "price": 4.37,
    "quantity": 3,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 17,
    "productName": "Muffin Batt - Carrot Spice",
    "price": 3.84,
    "quantity": 5,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 6,
    "productName": "Goldschalger",
    "price": 9.71,
    "quantity": 5,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 13,
    "productName": "Sponge Cake Mix - Chocolate",
    "price": 1.4,
    "quantity": 10,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 7,
    "productName": "Cheese - Goat",
    "price": 3.81,
    "quantity": 1,
    "isImported": false,
    "category": "Food"
  },
  {
    "id": 18,
    "productName": "Wine - Touraine Azay - Le - Rideau",
    "price": 6.02,
    "quantity": 4,
    "isImported": true,
    "category": "Food"
  },
  {
    "id": 2,
    "productName": "Soup Campbells - Italian Wedding",
    "price": 9.1,
    "quantity": 4,
    "isImported": false,
    "category": "Food"
  },
  {
    "id": 12,
    "productName": "codeine",
    "price": 7.86,
    "quantity": 3,
    "isImported": true,
    "category": "Medecine"
  },
  {
    "id": 5,
    "productName": "Asperin",
    "price": 6.85,
    "quantity": 3,
    "isImported": false,
    "category": "Medecine"
  },
  {
    "id": 15,
    "productName": "Paracetamol",
    "price": 9.5,
    "quantity": 0,
    "isImported": true,
    "category": "Medecine"
  },
  {
    "id": 3,
    "productName": "The Stranger in the Lifeboat",
    "price": 16.38,
    "quantity": 7,
    "isImported": true,
    "category": "Books"
  },
  {
    "id": 11,
    "productName": "The World of the End",
    "price": 14.02,
    "quantity": 9,
    "isImported": false,
    "category": "Books"
  },
  {
    "id": 19,
    "productName": "the power of habit",
    "price": 11.84,
    "quantity": 4,
    "isImported": false,
    "category": "Books"
  },
  {
    "id": 8,
    "productName": "Sapiens",
    "price": 12.61,
    "quantity": 8,
    "isImported": false,
    "category": "Books"
  },
  {
    "id": 16,
    "productName": "USB Flash Drive 64GB",
    "price": 9.18,
    "quantity": 8,
    "isImported": true,
    "category": "Electric"
  },
  {
    "id": 9,
    "productName": "Wireless Keyboard",
    "price": 9.16,
    "quantity": 5,
    "isImported": false,
    "category": "Electric"
  },
  {
    "id": 4,
    "productName": "Dior sauvage 100ml",
    "price": 73.58,
    "quantity": 6,
    "isImported": false,
    "category": "Parfum"
  },
  {
    "id": 10,
    "productName": "Giorgio Armani Acqua Di Gio 100ml",
    "price": 76.32,
    "quantity": 8,
    "isImported": false,
    "category": "Parfum"
  }
]
```

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Démarrez l'application :
   ```bash
   ng serve
   ```

4. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:4200`.

## Tests

Pour exécuter les tests unitaires, utilisez la commande suivante :
```bash
npx jest
```

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

Feel free to modify this README to better suit your project's specifics and requirements! Let me know if you need any further assistance.
