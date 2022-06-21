import myJson from "./dino.json" assert { type: "json" };
const { Dinos } = myJson;
// Create Dino Constructor
function Dino({ species, weight, height, diet, where, when, fact }) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Human Constructor
function Human({ name, feet, inches, weight, diet }) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
}
// Use IIFE to get human data from form
document.getElementById("btn").addEventListener("click", function () {
  const inputsData = Array.from(
    document.querySelectorAll("#dino-compare input")
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  const select = document.getElementById("diet");
  const diet = select.options[select.selectedIndex].value;
  // Create Human Object
  const user = new Human({ ...inputsData, diet });
  removeForm();
  // Create Dino Objects
  const dinosArray = Dinos.map((dino) => {
    // Create Dino Objects
    const { weight, height, diet, where, when, fact } = dino;
    const facts = [
      fact,
      weightComparation(weight, user.weight),
      heightComparation(height, user.height),
      dietComparation(diet, user.diet),
      fromWhere(where),
      sinceWhen(when),
    ];
    return new Dino({
      ...dino,
      fact: facts[Math.floor(Math.random() * facts.length)],
    });
  });
  tiles(dinosArray);
});
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const weightComparation = (dinoWeight, humanWeight) => {
  return dinoWeight < humanWeight
    ? `less weight than you`
    : `over weight than you`;
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const heightComparation = (dinoHeight, humanHeight) => {
  return dinoHeight < humanHeight
    ? `less height than you`
    : `over height than you`;
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, heigh·t in inches.
const dietComparation = (dinoDiet, humanDiet) => {
  return dinoDiet == humanDiet
    ? `the same diet habit with you`
    : `different diet habit with you`;
};
const fromWhere = (where) => {
  return `It is found in ${where}`;
};
const sinceWhen = (when) => {
  return `It is alive around ${when}`;
};
// Generate Tiles for each Dino in Array
const tiles = (Dinos) => {
  const tileContainer = document.getElementById("grid");
  Dinos.forEach((Dino, index) => {
    const grid = document.createElement("div");
    grid.classList.add("grid-item");
    const img = document.createElement("img");
    if (index == Dinos.length / 2) {
      const grid = document.createElement("div");
      grid.classList.add("grid-item");
      const img = document.createElement("img");
      img.src = "./images/human.png";
      grid.appendChild(img);
      tileContainer.appendChild(grid);
    }
    img.src = `./images/${Dino.species.toLowerCase()}.png`;
    grid.appendChild(img);
    const factBlock = document.createElement("p");
    const fact = document.createElement("h3");
    factBlock.appendChild(fact);
    let text;
    if (Dino.species == "Pigeon") {
      text = document.createTextNode("All birds are dinosaurs.");
    } else {
      text = document.createTextNode(Dino.fact);
    }
    fact.appendChild(text);
    grid.appendChild(factBlock);
    tileContainer.appendChild(grid);
  });
};
// Add tiles to DOM

// Remove form from screen
const removeForm = () => {
  const form = document.getElementById("dino-compare");
  form.remove();
};
// On button click, prepare and display infographic
