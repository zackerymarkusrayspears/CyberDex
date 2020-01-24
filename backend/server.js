// Mongoose - allows us to set up schemas for the data we store in our MongoDB database. We will also set up our database connection using Mongoose.
const mongoose = require('mongoose');
// Express - framework for NodeJS. Handles our routing and  connection info (port, etc.). 
const express = require('express');
// Morgan - Handles logging stuff for databases.
const logger = require('morgan');
// Body-Parser - Makes sure the body of our requests is formatted correctly (in this case, we'll use JSON).
const bodyParser = require('body-parser');
// cors - Handles data request made to mongodb.
const cors = require('cors');

// Import the getSecret function from the secret.js file
const getSecret = require('./secret');

// Import the Mongoose Schema for our data
const Data = require('./DataSchema');

// Constant to hold the port that we are going to use to connect
const API_PORT = 3001;

// Create an Express app that will run on our Node server and route our requests
const app = express();

// Create an Express router which actually handles the routing
const router = express.Router();

// Use Mongoose to set up a connection to the database
mongoose.connect(getSecret('dbUrl'), { useNewUrlParser: true, useUnifiedTopology: true });

// Reference to our database connection
let db = mongoose.connection;

// Use the database connection to print out an error if one occurs when we try to connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure body-parser and morgan
app.use(bodyParser.urlencoded({ extended: false })); //Used for parsing data formatted in the x-www-form-urlencoded format
app.use(bodyParser.json()); //Used for parsing data formatted in the JSON format
app.use(logger('dev'));

// Default route that will run whenever we first connect to the server
router.get('/', (req, res) => {
    console.log('MongoDB Connected');
});

router.post('/postLogIn', (req, res) => {
    const { username, password } = req.body,
        idArray = [],
        accArray = [],
        recArray = [];
    let clientObject = {},
        dbSpread = false;

    // Use Mongoose to find data with the given schema
    Data.find((err, database) => {
        if (err) return res.send({ success: false, error: err });

        database.forEach(spread => {
            spread.account.forEach(acc => {
                if (username === acc.username && password === acc.password) {
                    if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
                    dbSpread = spread;
                    clientObject = acc;
                }
            });
        });
        if (!dbSpread) return res.send({ success: false, message: 'Failed to log in.'});

        dbSpread.account.forEach(acc => {
            idArray.push(acc.id);
            const accObject = {
                id: acc.id,
                spreadId: acc.spreadId,
                name: acc.name,
                username: acc.username,
                auth: acc.auth,
                type: acc.type
            };
            if (clientObject.type === 'admin') {
                accArray.push(accObject);
            } else if (clientObject.id === acc.id) accArray.push(accObject);
        });

        if (clientObject.type === 'admin') {

            dbSpread.record.forEach(rec => {
                if (recArray.length < 15) recArray.push(rec);
            });
            return res.send({ 
                success: true, 
                data: {
                    client: clientObject,
                    accId: idArray,
                    account: accArray,
                    record: recArray
                }
            });
        }
        return res.send({ 
            success: true, 
            data: {
                client: clientObject,
                accId: [],
                account: accArray,
                record: []
            }
        });
    });
});

// Route to retrieve data from the database
router.post('/postSpread', (req, res) => {
    const { id, username, password } = req.body,
        spreadId = [],
        spreadObj = {
            id: Number,
            title: String,
            sheet: Array
        }
        accId = [],
        accArray = [],
        recArray = [];
    let clientObject = {},
        dbSpread = false;

    Data.find((err, database) => {
        if (err) return res.send({ success: false, error: err });

        database.forEach(spread => {
            spreadId.push(spread.id);
            if (spread.id === id) {
                spreadObj.id = spread.id;
                spreadObj.title = spread.title;
                spreadObj.sheet = spread.sheet;
                dbSpread = spread;
                spread.account.forEach(acc => {
                    if (acc.username === username && acc.password === password) {
                        clientObject = acc;
                        if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
                    }
                });
            };
        });
        if (!dbSpread) return res.send({ success: false, message: 'Client not authorized.' });

        dbSpread.account.forEach(acc => {
            accId.push(acc.id);
            const accObject = {
                id: acc.id,
                spreadId: acc.spreadId,
                name: acc.name,
                username: acc.username,
                auth: acc.auth,
                type: acc.type
            };
            if (clientObject.type === 'admin') {
                accArray.push(accObject);
            } else if (clientObject.id === acc.id) accArray.push(accObject);
        });

        if (clientObject.type === 'admin') {
            dbSpread.record.forEach(rec => {
                if (recArray.length < 15) recArray.push(rec);
            });
            return res.send({ 
                success: true, 
                data: {
                    spreadId: spreadId,
                    spread: spreadObj,
                    accId: accId,
                    account: accArray,
                    record: recArray
                } 
            });
        }
        return res.send({ 
            success: true, 
            data: {
                spreadId: [],
                spread: spreadObj,
                accId: [],
                account: [],
                record: []
            } 
        });
    });
});

router.put('/putSheet', (req, res) => {

    // Pull the ID and message from the body of the request.
    const { id, sheetId, username, password, sheet, record } = req.body;
    let clientObject = [];

    Data.findOne({ id: id }, (error, spread) => {
        if (error) return res.send({ success: false, error: error });

        spread.account.forEach(acc => {
            if (acc.username === username && acc.password === password) {
                clientObject = acc.auth;
                if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
            }
        });
        if (!clientObject.includes(sheetId) && !clientObject.includes('full')) return res.send({ success: false, message: 'Client not authorized.' });

        const newData = spread,
            newRecord = [];
        spread.record.forEach(rec => newRecord.push(rec));
        newRecord.unshift(record);

        // Configure the Schema object.
        newData.id = id;
        newData.title = spread.title;
        newData.sheet = sheet;
        newData.account = spread.account;
        newData.record = newRecord;
    
        Data.replaceOne({ _id: spread._id }, newData, err => {
            if (err) {
                return res.send({ success: false, error: err });
            } else {
                return res.send({ success: true });
            }
        });
    });
});

router.put('/putAccount', (req, res) => {
    // Pull the ID and message from the body of the request.
    const { id, username, password, title, account, record } = req.body,
        accArray = [],
        existArray = [],
        keepArray = [];
    let clientObject = false,
        nextIndex = false;

    Data.findOne({ id: id }, (err, spread) => {
        if (err) return res.send({ success: false, error: err });

        spread.account.forEach(acc => {
            if (acc.username === username && acc.password === password) {
                clientObject = acc;
                if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
            }
            existArray.push(acc.id);
            account.forEach(newAcc => {
                if (acc.id === newAcc.id) keepArray.push(newAcc.id);
            });
        });
        if (!clientObject) return res.send({ success: false, message: 'Client not authorized.' });

        spread.account.forEach(acc => {
            nextIndex = false;
            account.forEach(newAcc => {
                let password = acc.password;
                const person = {
                    id: newAcc.id,
                    spreadId: newAcc.spreadId,
                    name: newAcc.name,
                    username: newAcc.username,
                    password: password,
                    auth: newAcc.auth,
                    type: newAcc.type
                };
                if (!existArray.includes(newAcc.id) && clientObject.type === 'admin') {
                    password = newAcc.password;
                    accArray.push(person);
                    existArray.push(newAcc.id);
                }
                if (!nextIndex && acc.id === newAcc.id) {
                    nextIndex = true;
                    if (clientObject.type === 'admin' && !keepArray.includes(newAcc.id)) return
                    accArray.push(person);
                }
            });
        });

        const newData = spread,
            newRecord = [];
        spread.record.forEach(rec => newRecord.push(rec));
        newRecord.unshift(record);

        // Configure the Schema object.
        newData.id = id;
        newData.title = title;
        newData.sheet = spread.sheet;
        newData.account = accArray;
        newData.record = newRecord;

        Data.replaceOne({ _id: spread._id }, newData, error => {
            if (error) return res.send({ success: false, error: error });
            return res.send({ success: true });
        });
    });
});

router.post('/postHistory', (req, res) => {
    const { id, user, type, amount, index } = req.body,
        newDisplay = [];

    Data.findOne({ id: id }, (err, spread) => {
        if (err) return res.send({ success: false, error: err });

        for (var i = index; newDisplay.length < amount; i++) {
            if (user === spread.record[i].id || user === 'all') {
                if (type === spread.record[i].type || type === 'all') {
                    newDisplay.push(spread.record[i]);
                }
            }
            if (i === spread.record.length - 1) return res.send({ success: true, data: newDisplay});
        }
        return res.send({ success: true, data: newDisplay });
    });
});

// Route that will put new information in the database
router.post('/postData', (req, res) => {
    // A new instance of the Mongoose Schema which we will send to the database.
    let newData = new Data();

    // Pull the ID and message from the body of the request.
    const { id, title, sheet, account, record } = req.body;

    // Configure the Schema object.
    newData.id = id;
    newData.title = title;
    newData.sheet = sheet;
    newData.account = account;
    newData.record = record;

    // To save to the database.
    newData.save(err => {
        if (err) {
           return res.send({ success: false });
        } else return res.send({ success: true });
    });
});

// Route to delete a given object from our database.
router.delete('/deleteData', (req, res) => {
    Data.deleteOne({ id: req.body.id }, err => {
        if (err) {
            return res.send({ success: false, error: err });
        } else {
            return res.send({ success: true });
        }
    });
});

// Tell Express to use use cors in te router.
app.use(cors());

// Tell Express to use a certain path and to use the router we set up.
app.use('/api', router);

// Tell Express to listen for requests on the appropriate port.
app.listen(API_PORT, () => console.log('LISTENING ON PORT: ' + API_PORT));
