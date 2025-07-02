const fs = require('fs');
const path = require('path');

const folderPath = './';  // Set this to the folder where your .png files are
const outputFile = 'index.db';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Failed to read directory:', err);
        return;
    }

    const pngFiles = files
        .filter(file => path.extname(file).toLowerCase() === '.png')
        .map(file => path.basename(file, '.png'));

    fs.writeFile(outputFile, pngFiles.join('\n'), (err) => {
        if (err) {
            console.error('Failed to write index.db:', err);
            return;
        }
        console.log(`index.db created with ${pngFiles.length} entries.`);
    });
});