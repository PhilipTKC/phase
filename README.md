## Phase App

### Start dev web server

    npm run watch:css
    npm start

### Build the app in production mode

    npm run build:css
    npm run build

---

## Sound Collection Builder

### Run Script

    node collection-builder.js

Script will run through each folder under `./static/sounds` and return a collection of categories and sounds as JSON to the `./static` folder.

The root of `./static/sounds` should only contain folders.

### Categorization

Sounds need to be sorted into categories. To create a category simply create a folder. Sub categories are currently not supported.

### Sounds

Sounds (Audio files) should be placed into folders (Categories) under `./static/sounds`.

The script does not check to see whether or not the file is an actual audio file.

### Sound Sources

- x

## TODO

- [ ] Sound Presets
- [ ] Create additional pages/components for better UI experience.
- [ ] Serve sounds from server
