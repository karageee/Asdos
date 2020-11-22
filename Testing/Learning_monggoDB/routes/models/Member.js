const mongoose = require("mongoose");
    
var memberSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String
    },{
        collection: 'Users'
    });
module.exports = mongoose.model("Member", memberSchema);
