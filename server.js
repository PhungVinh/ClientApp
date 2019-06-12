var jsonConcat = require('json-concat'),
    fs = require('fs');

console.log('Merging language resource...');
/**
 * Merge language resource seperated into one
 * @param resDirectory parent language resource directory path
 * @param langDirectory language resource directory path
 * @readonly plz don't make any change in this file
 */
const resDirectory = `${__dirname}/src/assets/i18n`;
fs.readdirSync(resDirectory).forEach((file) => {
    if(fs.lstatSync(`${resDirectory}/${file}`).isDirectory()) {
        const langDirectory = `${resDirectory}/${file}`;
        console.log(`Merging language resource on : ${langDirectory}`);
        jsonConcat({
            src: langDirectory,
            dest: `${langDirectory}.json`
        }, json => {});
    }
});