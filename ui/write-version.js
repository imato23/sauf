const {version} = require('./package.json');
const fs = require('fs');
fs.writeFileSync('public/assets/version.json', JSON.stringify({version}));
