# Full-Stack-development-MEAN
Full Stack development: Mongoose (MongoDB), Express, Angular (Ionic4-Angular), NodeJS.

Build Ionic-Angular-Front-End:
ng build --prod --buildOptimizer=true --aot=true --optimization=true

Run the project (Windows, for Linux change Path to serve static resources ):

  $ npm start
  $ cd angular_frontend
  $ ionic serve

For Production in azure use (Linux user dbc770, change paths if needed for other OSs):

  $ sudo nodemon
  $ cd angular_frontend
  $ ionic build --prod
  $ ng serve --host 10.0.1.9 --port 8080 --public-host http://dbc770nodejs.westeurope.cloudapp.azure.com --disableHostCheck true


OR using PWA:

For Production in azure VM Master Ansible use:

$ sudo nodemon
$ cd angular_frontend
$ ionic build --prod
$ angular-http-server ./www -p 8080


For production in local
$ sudo nodemon
$ cd angular_frontend
$ ionic build --prod
$ angular-http-server ./www -p 8080

