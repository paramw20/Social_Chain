const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(

    {url:String,}
    
);

module.exports = mongoose.model("Report", userSchema);
