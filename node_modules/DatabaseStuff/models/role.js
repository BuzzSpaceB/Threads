var mongoose = require('mongoose');

var RoleSchema = mongoose.Schema({
    role_id         : String,           /* The id of the role */
    name            : String,           /* The name of the role, as from LDAP */
    role_weight     : Number            /* The weighting of the role, this is used for comparison of the roles*/
});


module.exports = mongoose.model("roles", RoleSchema);
