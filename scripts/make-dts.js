const fs = require('fs');
const path = require('path');
const package = require('../package.json');

Object.keys(package.exports)
  .map((entry) => entry.replace(/^\.\/?/, ''))
  .filter(Boolean)
  .forEach((entry) => {
    fs.writeFileSync(
      path.resolve(__dirname, '../', `${entry}.d.ts`),
      `export * from './dist/${entry}';`,
    );
  });
