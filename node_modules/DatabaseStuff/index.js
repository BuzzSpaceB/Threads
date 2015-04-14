/**
 * This is the object used to contain the loaded models
 * @constructor
 */
function DS() {
    /**
     *  An empty array that will be used to hold the mongoose Schemas that are locatedin the ./models folder
     */
    this.models = {};
}

/**
 * Initiates all the mongoose Schemas that are located in the ./models folder.
 * @param mongoose mongoose used in main app passed to this module.
 */
DS.prototype.init = function(mongoose) {

    /**
     * Prints out to the console once a connection has been established to the server.
     */
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
    });

    /**
     * Prints out to the console if there has been a connection error.
     */
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });

    /**
     * Connects to the database
     */
    mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

    /*
        Loads the required modules into the application.
     */
    require('./models/appraisal');
    require('./models/module');
    require('./models/notification');
    require('./models/post');
    require('./models/role');
    require('./models/service');
    require('./models/service_restriction');
    require('./models/space');
    require('./models/subscription');
    require('./models/thread');
    require('./models/user');
    require('./models/user_subscription_settings_schema');
    require('./models/resources');
    /*
        This is just to make referencing the models easier within the buzz modules.
        The model name you use here must match the name you used in the schema file.
    */
    this.models = {
        space: mongoose.model('spaces'),
        appraisal: mongoose.model("appraisals"),
        module: mongoose.model('modules'),
        notification: mongoose.model('notifications'),
        post: mongoose.model('posts'),
        role: mongoose.model('roles'),
        serviceRestriction: mongoose.model('servicerestrictions'),
        subscription: mongoose.model('subscriptions'),
        thread: mongoose.model('threads'),
        user: mongoose.model('users'),
        userSubscriptionSettings: mongoose.model('usersubscriptionsettings'),
        resource: mongoose.model('resources')
    }
};

//Creates an instance of the DS class
var ds = new DS();

//exports the class for use by buzz modules using this module
module.exports = ds;