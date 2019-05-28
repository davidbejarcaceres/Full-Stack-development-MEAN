var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const pathPublicServer = "c:/Users/Public/node/meanFinal/public/";




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Trips' });
  //res.redirect('http://example.com');
});

/* GET upload page. */
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Uploading Images' });
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
        fs.readdir(pathPublicServer + file.name, { withFileTypes: true }, (err, subFiles1) => {

          for (var file1 in subFiles1) {
            list.push("    -  " + subFiles1[file1].name)
  
  
            var extension = path.extname(subFiles1[file1].name)
  
            if (extension == "") {
  
              pathLevel3 = pathPublicServer+ file.name + "/" + subFiles1[file1].name;
  
  
  
  
              ///////////////////////
  
  
              fs.readdir(pathLevel3, { withFileTypes: true } , (err, files2) => {
                files2.forEach(file2 => {
                  console.log(file2);
                  list.push(file2.name)
                  if (file2.isDirectory()){
                    var pathLevel4 = pathLevel3 + "/" + file2.name;
                    
                    fs.readdir(pathLevel4, { withFileTypes: true },  (err, subFiles2) => {
                      for (var file3 in subFiles2) {
                        list.push("    -  " + subFiles2[file3].name)
              
                        // Checks if the file is a folder
                        var extension = path.extname(subFiles2[file3].name)          
                        if (extension == "") {
                          console.log("It´s another folder");                                                    
                        }
                                  
                      }
                      res.status(200).send(list)
                    });
  
  
                    
            
                  }
                });
              });
  
  
              //////////////////////////
  
             
            }
            
  
          }

        });      
      }
    });
    //res.status(200).send(list)
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