// Variables globales
let gridSize;              // taille de la grille (n)
let cellSize = 60;         // taille en pixels de chaque cellule de la grille d'entrées
let inputGrid = [];        // tableau des états des pixels (-1 = éteint, 1 = allumé)
let weightSliders = [];    // tableau des sliders pour les poids
let biasSlider;            // slider pour le biais
let canvas;

// Fonction p5.js de configuration
function setup() {
  // Récupération de la taille de la grille via l'URL (exemple : activite.html?n=5)
  let urlParams = new URLSearchParams(window.location.search);
  gridSize = parseInt(urlParams.get('n')) || 4; // défaut à 4 si rien n'est fourni

  // Création du canvas pour la grille d'entrées et rattachement dans le conteneur prévu
  canvas = createCanvas(gridSize * cellSize, gridSize * cellSize);
  canvas.parent('canvas-container');

  // Initialisation de la grille d'entrées (tous les pixels éteints)
  for (let i = 0; i < gridSize * gridSize; i++) {
    inputGrid[i] = -1;
  }

  // Création des curseurs pour les poids
  let slidersContainer = select('#sliders-container');
  
  // Définir le nombre de colonnes dans la grille via une variable CSS
  slidersContainer.style('--grid-columns', gridSize);
  
  // Pour chaque ligne
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let sliderCell = createDiv();
      sliderCell.class('slider-cell');
      sliderCell.style('grid-row', i + 1);
      sliderCell.style('grid-column', j + 1);
      sliderCell.parent(slidersContainer);
      
      // Création du slider avec une plage de -5 à 5, valeur initiale à 1 et pas de 0.1
      let slider = createSlider(-1, 1, 0, 0.05);
      slider.style('width', '60px');
      slider.parent(sliderCell);
      slider.class('weight-slider');
      weightSliders[i * gridSize + j] = slider;
    }
  }

  // Création de la cellule pour le biais (dernier slider)
  let biasCell = createDiv();
  //biasCell.class('slider-cell last-slider');
  biasCell.parent(slidersContainer);
  
  // Positionner le dernier slider selon le nombre de colonnes
  if (gridSize % 2 === 0) {
    // Si nombre pair de colonnes, merger les deux cases centrales
    biasCell.style('grid-column', `${gridSize/2} / span 2`);
    biasCell.style('grid-row', `${gridSize + 1}`);
  } else {
    // Si nombre impair, centrer sur une nouvelle ligne
    biasCell.style('grid-column', `${Math.floor(gridSize/2) + 1} / span 2`);
    biasCell.style('grid-row', `${gridSize + 1}`);
  }
  
  biasSlider = createSlider(-5, 5, 0, 0.1);
  biasSlider.style('width', '120px');
  biasSlider.parent(biasCell);
  biasSlider.class('bias-slider');
}

// Fonction de dessin (appelée en boucle)
function draw() {
  background(220);
  drawInputGrid();

  // Calcul de la somme pondérée : somme = biais + somme des (x_i * poids_i)
  let sum = biasSlider.value();
  for (let i = 0; i < gridSize * gridSize; i++) {
    sum += inputGrid[i] * weightSliders[i].value();
  }

  // Transformation de la somme en une sortie comprise entre 0 et 100%
  // Ici, on utilise la fonction sigmoïde : pour sum = 0, on obtient 50%
  //let percentage = sigmoid(sum) * 100;
  let percentage = (sum *100) / (gridSize*gridSize);
  
  // Calcul des composantes de couleur (rouge à vert)
  let red = map(percentage, 0, 100, 255, 0);
  let green = map(percentage, 0, 100, 0, 255);

  // Mise à jour de l'affichage de la sortie avec la couleur
  let outputText = select('#output-text');
  outputText.html(`${nf(percentage, 1, 0)}%`);
  
  // Appliquer la couleur au conteneur
  let outputContainer = select('#output-container');
  outputContainer.style('background-color', `rgb(${red}, ${green}, 0)`);

}

// Fonction qui dessine la grille d'entrées
function drawInputGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let index = i * gridSize + j;
      let x = j * cellSize;
      let y = i * cellSize;
      // Remplissage : noir si activé, blanc sinon
      fill(inputGrid[index] === 1 ? 255 : 0);
      stroke(0);
      rect(x, y, cellSize, cellSize);
    }
  }
}

// Fonction qui permet de basculer l'état d'un pixel lorsqu'on clique sur le canvas
function mousePressed() {
  // Vérifier que le clic est dans la zone du canvas
  if (mouseX >= 0 && mouseX < gridSize * cellSize && mouseY >= 0 && mouseY < gridSize * cellSize) {
    let col = floor(mouseX / cellSize);
    let row = floor(mouseY / cellSize);
    let index = row * gridSize + col;
    // Bascule : si 0 devient 1, si 1 devient 0
    inputGrid[index] = inputGrid[index] === -1 ? 1 : -1;
  }
}

// Fonction sigmoïde classique
function sigmoid(x) {
  return 1 / (1 + exp(-x));
}
