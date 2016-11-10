//预处理
let fs = require('fs');
let path = require('path');

let dict = {};

var files = fs.readdirSync('./src/img');

console.log(files.join(`","`));

files.forEach(file => {
    let name = file.split('.')[0];
    dict[name] = fs.readFileSync('./src/img/' + file).toString('base64');
});

for (let k in dict) {
    let v = dict[k];
    let content = `hitplane_define('${k}','${v}')`;
    fs.writeFileSync(`./dist/source/${k}.js`, content, 'utf-8');
}

var child = require('child_process');

child.exec(`explorer ${path.join(__dirname, 'index.html')}`);

child.exec(`open ${path.join(__dirname, 'index.html')}`);