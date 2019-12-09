// Creating a Mongoose Schema that we will use to make sure the data we send to our MongoDB is formatted correctly.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        number: Number,
        buiding: Number,
        extensions: Number,
        firstName: String,
        lastName: String,
        room: Number,
        spreadsheetId: String,
        sheet: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);