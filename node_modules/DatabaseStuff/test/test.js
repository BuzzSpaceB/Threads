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


/* Create */
    var newSpace = space();
        newSpace.module_id = "TEST" + Math.floor((Math.random() * 999) + 1);
        newSpace.registered_users = [{ user_id: "u12345678" }, { user_id: "u87654321" }];
        newSpace.academic_year = "2015";
        newSpace.is_open = false;
        newSpace.root_thread_id	 = "5527c698faa3e73c0f15b7fc";
        newSpace. administrators = [{ user_id: "u11111111" }, { user_id: "u99999999" }];

    //Saves the new thread to the database
    newSpace.save(function (err) {
        if (err)
            console.log("ERR newSpace.save: " + err);
        else
            console.log("Saving:\n " + newSpace );
    });

    /* Delete */
    space.remove({ module_id: newSpace.module_id }, function(err) {
        if (err)
            console.log("ERR:  space.remove" + err);
        else
            console.log("Deleting: " + newSpace.module_id );
    });

/* Read */
    //finds all the spaces in the db
    space.find(function (err, aSpace) {
        if (err)
            console.log("ERR space.find: " + err);
        else
            console.log("Found " + aSpace.length + " spaces in the database.");
    });

    //finds ONE spesific space in the db
    space.findOne({ 'module_id' :  "COS301" }, function (err, aSpace) {
        if (err)
            console.log("ERR space.findOne: " + err);
        else
            console.log("Found the space you were looking for:\n " + aSpace);
    });

/* Read */
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