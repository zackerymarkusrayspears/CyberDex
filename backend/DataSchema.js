// Creating a Mongoose Schema that we will use to make sure the data we send to our MongoDB is formatted correctly.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        title: String,
        sheet: Array,
        account: Array,
        record: Array
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);