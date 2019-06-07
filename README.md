# Full-Stack-development-MEAN
Full Stack development: Mongoose (MongoDB), Express, Angular (Ionic4-Angular), NodeJS.

Run the project:

```
  $ mongorestore --host localhost --db Mytrips
  $ npm start
  $ cd angular_frontend
  $ ionic serve
  
```

For Production use:
```
$ sudo nodemon
$ cd angular_frontend
$ ng serve --host 10.0.1.9 --port 8080 --public-host http://dbc770nodejs.westeurope.cloudapp.azure.com --disableHostCheck true
```
For production you have to make sure the VM is running in azure, if not, it´s not going to work.
