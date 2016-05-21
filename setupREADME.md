# Setup Specification of washbay server

## OS Setup

### Ubuntu 14.04 LTS

- Creating User

  ```
  sudo adduser <username> #follow instructions prefer a password user account)
  sudo visudo             #edit sudo file with
                          #<username> ALL = (ALL:ALL) ALL
                          #add the above line just after user privilege Specification
  sudo adduser <username> sudo #crosscheck the sudoers right
  cat .ssh/authorized_keys > /tmp/temp-key
  sudo su <username>
  cd
  mkdir .ssh
  chmod 700 .ssh
  sudo cat /tmp/temp-key > .ssh/authorized_keys
  chmod 600 .ssh/authorized_keys
  ```

### nodejs

- [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)

  ```
  sudo apt-get install make g++ curl git graphicsmagick
  git clone https://github.com/visionmedia/n
  cd n
  sudo make install
  sudo n latest
  #sudo n io 6.0.0 is the latest version which is working
  sudo apt-get install -y build-essential openssl libssl-dev pkg-config
  sudo npm install -g node-gyp
  #Upgrade
  sudo n latest
  sudo npm upgrade -g npm
  ```

### mongodb

- [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04) ``

### Washbay Server as background process

- Using nohup

  ```
  nohup node washbayServer.js >/dev/null 2>&1 & # '/dev/null' acts as a sink or a black hole for all the screen outputs
  ```

- Using init script (as a service)
  ```
  create washbay.init
  ```

###   washbay typescript typings setup
* typescript setup
  ```
  sudo npm install -g typescript@latest
  tsc -v //check version , current : 1.9.0

  commands
  tsc -p <project path> //use . for current directory
  ```
* typings setup
  ```
  sudo npm install -g typings@latest
  typings -v //check version , current : 0.8.1

  commands
  typings install <package name> --ambient //@ambient for not having chained
                                           //typing dependencies
  ```
