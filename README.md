# Full-Stack-development-MEAN
Full Stack development: Mongoose (MongoDB), Express, Angular (Ionic4-Angular), NodeJS.


To build angular-ionic app go to anguñar_frontend:

  $ ng build --prod --aot=true --buildOptimizer=true  --optimization=true

Run the project:

  $ npm start
  $ cd angular_frontend
  $ ionic serve

For Production in azure use:

$ sudo nodemon
$ cd angular_frontend
$ ionic build --prod
$ ng serve --host 10.0.1.9 --port 8080 --public-host http://dbc770nodejs.westeurope.cloudapp.azure.com --disableHostCheck true



OR using PWA:

For Production in azure use:

$ sudo nodemon
$ cd angular_frontend
$ cd www
$ angular-http-server


For production in local
$ sudo nodemon
$ cd angular_frontend
$ cd www
$ angular-http-server


Problems with node-sass npm module:

sudo npm install --save-dev  --unsafe-perm node-sass