#Setup Specification of washbay server
##OS Setup
###Ubuntu 14.04 LTS
* Creating User
```
  sudo adduser <username> #follow instructions prefer a password user account)
  sudo visudo             #edit sudo file with
                          #<username> ALL = (ALL:ALL) ALL
                          #add the above line just after user privilege Specification
  sudo adduser <username> sudo #crosscheck the sudoers right
  
```
