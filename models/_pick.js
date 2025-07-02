const fs = require('fs');
const path = require('path');

const folderPath = './';  // Set this to the folder where your .glb files are
const outputFile = 'index.db';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Failed to read directory:', err);
        return;
    }

    const glbFiles = files
        .filter(file => path.extname(file).toLowerCase() === '.glb')
        .map(file => path.basename(file, '.glb'));

    fs.writeFile(outputFile, glbFiles.join('\n'), (err) => {
        if (err) {
            console.error('Failed to write index.db:', err);
            return;
        }
        console.log(`index.db created with ${glbFiles.length} entries.`);
    });
});