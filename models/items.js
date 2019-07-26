const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    author: {
        type: String,
        required: true
    },
    content: String    
});

var Item = mongoose.model(
    'Item',
    itemSchema
);

module.exports = Item = mongoose.model("items", itemSchema);