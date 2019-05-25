var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var users = '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';


  var estudiantes = [new Employee("David", "Bejar"), new Employee("Mireya", "Ortiz")];



  res.render('index', { title: 'Express', estudiantes: Employee });
});

module.exports = router;


class Employee{
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getFirstname(){
    return this.firstname;
  }

  getLastname(){
    return this.lastname;
  }

  setFirstname(firstname){
    this.firstname = firstname;
  }

  setLastName(lastname){
    this.lastname = lastname;
  }
}
