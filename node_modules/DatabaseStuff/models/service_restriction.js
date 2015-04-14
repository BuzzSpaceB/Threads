var mongoose = require('mongoose');

var ServiceRestrictionSchema = mongoose.Schema({
    restriction_id              : String, /*buzz_id + service_id */
    buzz_space_id               : mongoose.Schema.ObjectId,
    service_id                  : mongoose.Schema.ObjectId,
    minimum_role                : mongoose.Schema.ObjectId,
    minimum_status_points       : Number,
    deleted                     : Boolean
});

module.exports = mongoose.model('servicerestrictions', ServiceRestrictionSchema);