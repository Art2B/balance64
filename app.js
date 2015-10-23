var fs = require('fs');

var config = {
  src: './sources/god.html',
  outputPath: './',
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

function writeImg(base64String){
  var type = base64String.match(config.typeRegex)[0];
  var regex = /data:image\/(gif|jpg|jpeg|png);base64,/;
  var dataBase64 = base64String.match(regex)[0];
  var base64 = base64String.replace(dataBase64, '');
  fs.writeFileSync(config.outputPath+'result.'+type, base64, 'base64');
  return;
}

console.log('Begin convertion');
fs.readFile(config.src, 'utf-8',function(err, data){
  if(err) {
    return console.log(err);
  }

  var base64Imgs = getBase64StringData(data);

  for(var i=0; i<base64Imgs.length; i++){
    writeImg(base64Imgs[i]);
  }
  console.log('done');
  process.exit();
});