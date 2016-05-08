# API List

## Curl Request, Data structure, Output

### Verification module

- SignUp

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/verification/signup' -X POST -d '{"name":{"fname":"Amitesh ","lname":"Rai"}, "password":"washbay@123","email":"amitesh.rai@washbay.in","phone":"0000000000","utype":null}' -H 'Content-Type:application/json'
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
    curl -i 'http://localhost:9135/w1/verification/signin' -X POST -d '{"username":"<email/phone>","password":"<password>"}' -H 'Content-Type:application/json'
  * Data Structure (required)
    {
      'username' : '<email/phone>',
      'password' : '<password>'
    }
  * Output
    Success message and Auth Token
  ```

* Query Item

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/itemquery?lquery=<string>' -X GET -H 'Authorization: bearer <authToken>'
  * Data Structure
  * Output
    [{"_id" : "<id>"","iName":"<name>"}]
  ```

* Add Item

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/item' -X POST -H 'Content-Type:application/json' -d '{"iName":"<name>","clothType":<0/1/2/3>,"wcost":{"classic":<val>,"super":<val>,"ultra":<val>},"icost":<val>,"dcost":<val>}' -H 'Authorization: bearer <authToken>'
  * Data Structure (required)
    {
      "iName" : "<name>",
      "clothType" : <0/1/2/3>,
      "wcost" : {
        "classic" : <val>,
        "super" : <val>,
        "ultra" : <val>
      },
      "icost" : <val>,
      "dcost" : <val>
    }
  * Output
    {<itemModel with _id>}
  ```

* Delete Item

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/item/<id>' -X DELETE -H 'Authorization: bearer <authToken>'
  * Data Structure
  * Output
    {<deleted item>}
  ```

* Update Item

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/item/<id>' -X PUT -H 'Content-Type:application/json' -d '{"_id":"<id>", <dataToBeUpdated>}' -H 'Authorization: bearer <authToken>'
  * Data Structure
    {
      "_id" : "<id>",
      "<key>" : "<updated value>"
    }
  * Output
    {<updated Item>}
  ```

* Get Item

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/item/<id>' -X GET -H 'Authorization: bearer <authToken>'
  * Data Structure
  * Output
    {<item>}
  ```

* Get Item List

  ```
  * Curl
    curl -i 'http://localhost:9135/w1/itemlist/<type>' -X GET -H 'Authorization: bearer <authToken>'
  * Data Structure
    <type> :
    all : 4
    men : 0
    women : 1
    kid boy : 2
    kid girl : 3
  * Output
    [{<item>}]
  ```
