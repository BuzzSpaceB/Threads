var mongoose = require('mongoose');

var SubscriptionShcema = mongoose.Schema({
    User_id: String,
	registeredTo: [String],
	Thread_id: String
});

module.exports = mongoose.model("subscriptions", SubscriptionShcema);
