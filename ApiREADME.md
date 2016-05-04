# API List

## Curl Request, Data structure, Output

### Verification module

- SignUp

  ```
  * Curl
    curl -i 'http://localhost:9135/verification/signup' -X POST -d '{"name":{"fname":"Amitesh ","lname":"Rai"}, "password":"washbay@123","email":"amitesh.rai@washbay.in","phone":"0000000000","utype":null}' -H 'Content-Type:application/json'
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

* SignIn

  ```
  * Curl
    curl -i 'http://localhost:9135/verification/signin' -X POST -d '{"username":"<email/phone>","password":"<password>"}' -H 'Content-Type:application/json'
  * Data Structure (required)
    {
      'username' : '<email/phone>',
      'password' : '<password>'
    }
  * Output
    Success message and Auth Token
  ```
