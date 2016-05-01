#API List
##Curl Request, Data structure, Output

###Verification module
* SignUp
```
  * Curl
    curl -i 'http://localhost:9135/verification/signup' -X POST -d '{"user":"amitesh", "password":"password"}' -H 'Content-Type:application/json'
  * Data structure (required)
    {
      'name' : {'fname':'<first-name>'},
      'email' : '<something@domain.com>',
      'password' : '<password>',
      'phone' : '<phone(10 digit)>',
      'utype' : <0>
    }
  * Output
    Success message
```
