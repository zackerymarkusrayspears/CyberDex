// Creating a Mongoose Schema that we will use to make sure the data we send to our MongoDB is formatted correctly.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        spreadsheetId: String,
        spreadsheetTitle: String,
        sheetTitle: Array,
        sheetValue: Array
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);