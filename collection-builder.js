const fs = require("fs");
const path = require("path");
const { startCase, camelCase } = require("lodash");

const soundDirectory = "./static/sounds";

const categories = [];

/*
 ** Read sound directory and return collection of Categories.
 ** Folder names are returned as PascalCase
 */
fs.readdirSync(soundDirectory).forEach(async (output, index) => {
  // Build a collection of categories based on folders.
  const stat = fs.statSync(`${soundDirectory}/${output}`);
  if (stat.isDirectory()) {
    categories.push({
      active: false,
      id: index,
      name: output,
      title: startCase(camelCase(output)),
      count: 0,
      activeSounds: 0,
    });
  }
});

const sounds = [];

/*
 ** Loop through each folder and return any sounds
 */
categories.forEach((category, catIndex) => {
  fs.readdirSync(`${soundDirectory}/${category.name}`).forEach(
    (sound, sndIndex) => {
      categories[catIndex].count += 1;
      const soundName = path.parse(sound).name;
      sounds.push({
        id: `${catIndex}-${sndIndex}`,
        name: startCase(camelCase(soundName)),
        category: catIndex,
        path: `sounds/${category.name}/${sound}`,
        volume: 50,
        isPlaying: false,
      });
    }
  );
});

/*
 ** Write Categories & Sounds to JSON.
 */
fs.writeFileSync("./static/categories.json", JSON.stringify(categories));

fs.writeFileSync("./static/sounds.json", JSON.stringify(sounds));
