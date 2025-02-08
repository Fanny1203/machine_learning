# Activité d'Apprentissage Machine Interactive

Cette application web interactive permet aux utilisateurs de comprendre visuellement le fonctionnement d'un perceptron simple. Elle est inspirée de la vidéo ["Neural Networks Demystified [Part 2: Forward Propagation]"](https://www.youtube.com/watch?v=l-9ALe3U-Fg) de Welch Labs.

## Fonctionnalités

- Grille interactive n×n où les utilisateurs peuvent activer/désactiver des cellules (-1/1)
- Sliders pour ajuster les poids de chaque entrée (entre -1 et 1)
- Slider de biais ajustable (entre -5 et 5)
- Visualisation en temps réel de la sortie avec un dégradé de couleur (rouge à vert)

## Comment utiliser

1. Ouvrez `activite.html` dans un navigateur web
2. Cliquez sur les cellules de la grille pour les activer (blanc) ou désactiver (noir)
3. Ajustez les poids avec les sliders verticaux correspondant à chaque cellule
4. Ajustez le biais avec le slider horizontal en bas
5. Observez la sortie qui s'actualise en temps réel

## Paramètres

- La taille de la grille peut être modifiée en ajoutant le paramètre `n` dans l'URL
  Exemple : `activite.html?n=5` pour une grille 5×5

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Bibliothèque p5.js pour le dessin et l'interactivité

## Inspiration

Cette activité pédagogique est inspirée de la série "Neural Networks Demystified" de Welch Labs, en particulier la [Partie 2 sur la Propagation Avant](https://www.youtube.com/watch?v=l-9ALe3U-Fg). La série offre une excellente introduction aux réseaux de neurones et a influencé la conception de cette interface interactive.
