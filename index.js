var child = require('child_process');
var path = require('path');

child.exec(`explorer ${path.join(__dirname, 'test', 'index.html')}`);

child.exec(`open ${path.join(__dirname, 'test', 'index.html')}`);