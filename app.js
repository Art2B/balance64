var fs = require('fs');

var config = {
  inputPath: './sources/',
  outputPath: './results/',
  regex: /(data:image\/(gif|png|jpg|jpeg);base64,.+?(?="))/gm,
  typeRegex: /(gif|png|jpg|jpeg)/gm
}

function getBase64StringData(str){
  var results = Array();
  var matchArray;
  while ((matchArray = config.regex.exec(str)) !== null) {
    results.push(matchArray[0])
  }
  return results;
}

function writeImg(base64String, fileName){
  var type = base64String.match(config.typeRegex)[0];
  var regex = /data:image\/(gif|jpg|jpeg|png);base64,/;
  var dataBase64 = base64String.match(regex)[0];
  var base64 = base64String.replace(dataBase64, '');
  console.log('Writing '+fileName+'.'+type);
  fs.writeFileSync(config.outputPath+fileName+'.'+type, base64, 'base64');
  return;
}

if (!fs.existsSync(config.outputPath)) {
  fs.mkdirSync(config.outputPath);
}

var sourcesFiles = fs.readdirSync(config.inputPath);
console.log('Begin generation');
for(var i=0; i<sourcesFiles.length; i++){
  var fileData = fs.readFileSync(config.inputPath+sourcesFiles[i], 'utf-8');

  var base64Imgs = getBase64StringData(fileData);

  for(var j=0; j<base64Imgs.length; j++){
    var fileName = sourcesFiles[i]+'-'+j;
    writeImg(base64Imgs[j], fileName);
  }
}
console.log('Done generating images files');
process.exit();