var express = require('express');
var router = express.Router();
const fs = require('fs');

const pathPublicServer = "c:/Users/Public/node/meanFinal/public/";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Trips' });
  //res.redirect('http://example.com');
});

/* GETS Any image from the public static directory*/
router.get('/res/images/:imagePath?', function(req, res, next) {
  res.sendFile( pathPublicServer +'/images/' + req.params.imagePath);
});

/* GETS Any image from the public static directory*/
router.get('/res/favicon/:faviconPath?', function(req, res, next) {
  res.sendFile( pathPublicServer +'/favicon/' + req.params.faviconPath);
});

/* GETS Any resource from the root of public static directory*/
router.get('/res/files/:filePath?', function(req, res, next) {
  res.sendFile( pathPublicServer +'/files/' +  req.params.filePath);
});

/* GET Logo. */
router.get('/logo', function(req, res, next) {
  res.sendFile( pathPublicServer +'/images/' + 'escudoMonocromo.png');
});

/* GET Logo. */
router.get('/res', function(req, res, next) {
  var list= [];
  fs.readdir(pathPublicServer, { withFileTypes: true } , (err, files) => {
    files.forEach(file => {
      console.log(file);
      list.push(file.name)
      if (file.isDirectory()){
        var subFiles = fs.readdirSync(pathPublicServer + file.name, { withFileTypes: true });
        for (var file in subFiles) {
          list.push("    -  " + subFiles[file].name)
        }
      }
    });
    res.status(200).send(list)
  });
});

function readsDir(list) {
  fs.readdir(pathPublicServer, { withFileTypes: true } , (err, files) =>{
    files.forEach(file => {
      list.push(file)
    })
  });
}

module.exports = router;