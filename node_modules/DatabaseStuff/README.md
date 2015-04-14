## Changes will/can be made to these files, without notice.

# DatabaseStuff
We setup a module fot everyone to use which manages the database, from connection to all the schemas.

All collections are lowercase and in the plural form. e.g "threads" and not"Thread".
All variables (to gain access to a collection via the module) use the singular form form. e.g "thread" and not"Threads".
```javascript
var modelName = ds.models.modelName;
//e.g.
var space = ds.models.space;
var appraisal = ds.models.appraisal;
var module = ds.models.module;
var notification = ds.models.notification;
var post = ds.models.post;
var role = ds.models.role;
var serviceRestriction = ds.models.serviceRestriction;
var space = ds.models.space;
var subscription = ds.models.subscription;
var thread = ds.models.thread;
var user = ds.models.user;
var userSubscriptionSettings = ds.models.userSubscriptionSettings;
//these variables are then the schemas 
```

# How to use
1. Add module dependancy to package.json file (you need mongoose as well)
    Make sure you are using mongoose >= v4.0.1 as older versions gave problems
  ```javascript
    "dependencies": {
      ...
      "mongoose": "^4.0.1",
      "DatabaseStuff": "git://github.com/BuzzSpaceB/DatabaseStuff#master"
    }
      
  ```
2. Let npm download the modules. In the console run:
    ```
        npm install
    ```
3. Initiate the models in your applications main file /when your buzz module starts up
  ```javascript
       var mongoose = require('mongoose')
       , ds = require('DatabaseStuff');
       
       ds.init(mongoose);//this line is very important
  ```
4. Where you want to use a schema/the database use the following template
  ```javascript
      var ds = require('DatabaseStuff');
      var modelName = ds.models.modelName;
  
      //then you can use it as you normally would have used a schema.
  
      modelName.findById(req.params.id, function(err, objFromDB) {
          if (err)
              console.log(err.message);
          else{
              var model= {modelData: objFromDB};
              //do what you want
          }
      });
  ```
# Example
See the /test folder for more
    ```javascript
    var mongoose = require('mongoose')
        , ds = require('DatabaseStuff');

    ds.init(mongoose);

    var space = ds.models.space;
    var appraisal = ds.models.appraisal;
    var module = ds.models.module;
    var notification = ds.models.notification;
    var post = ds.models.post;
    var role = ds.models.role;
    var serviceRestriction = ds.models.serviceRestriction;
    var subscription = ds.models.subscription;
    var thread = ds.models.thread;
    var user = ds.models.user;
    var userSubscriptionSettings = ds.models.userSubscriptionSettings;

    appraisal.find(function (err, a) {
        if (err)
            console.log("ERR appraisal.find: " + err);
        else
            console.log("Found " + a.length + " appraisals in the database.");
    });
    module.find(function (err, a) {
        if (err)
            console.log("ERR module.find: " + err);
        else
            console.log("Found " + a.length + " modules in the database.");
    });
    notification.find(function (err, a) {
        if (err)
            console.log("ERR notification.find: " + err);
        else
            console.log("Found " + a.length + " notifications in the database.");
    });
    post.find(function (err, a) {
        if (err)
            console.log("ERR post.find: " + err);
        else
            console.log("Found " + a.length + " posts in the database.");
    });

    role.find(function (err, a) {
        if (err)
            console.log("ERR role.find: " + err);
        else
            console.log("Found " + a.length + " roles in the database.");
    });

    serviceRestriction.find(function (err, a) {
        if (err)
            console.log("ERR serviceRestriction.find: " + err);
        else
            console.log("Found " + a.length + " serviceRestrictions in the database.");
    });

    subscription.find(function (err, a) {
        if (err)
            console.log("ERR subscription.find: " + err);
        else
            console.log("Found " + a.length + " subscriptions in the database.");
    });

    thread.find(function (err, a) {
        if (err)
            console.log("ERR thread.find: " + err);
        else
            console.log("Found " + a.length + " threads in the database.");
    });

    user.find(function (err, a) {
        if (err)
            console.log("ERR user.find: " + err);
        else
            console.log("Found " + a.length + " users in the database.");
    });

    userSubscriptionSettings.find(function (err, a) {
        if (err)
            console.log("ERR userSubscriptionSettings.find: " + err);
        else
            console.log("Found " + a.length + " userSubscriptionSettings in the database.");
    });
    ```

# How to view what is going on in the database
Download [Robomongo](http://robomongo.org/)
## Settings
### 1. Connection
    Address: proximus.modulusmongo.net
    Port: 27017
### 2. Authentication
```
Database: purYv9ib
User Name: d3user
Password: DdJXhhsd2
```
