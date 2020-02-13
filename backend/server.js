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
app.use(bodyParser.urlencoded({ extended: false })); // Used for parsing data formatted in the x-www-form-urlencoded format
app.use(bodyParser.json()); // Used for parsing data formatted in the JSON format
app.use(logger('dev'));



// Default route that will run whenever we first connect to the server
router.get('/', (req, res) => {
    console.log('MongoDB Connected');
});



// Log into CyberDex.
router.post('/postLogIn', (req, res) => {
    const { username, password } = req.body,
        resArray = [[],[]], newAccount = resArray[0], newRecord = resArray[1];
    let clientObject = false,
        correctSpread = false;

    // Find account spreadsheet.
    Data.find((err, database) => {
        if (err) return res.send({ success: false, error: err });

        // Authorize request
        database.forEach(spread => {
            correctSpread = false;

            // Client Data.
            spread.account.forEach(acc => {
                if (username === acc.username && password === acc.password) {
                    if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
                    clientObject = acc;
                    correctSpread = true;
                }
            });
            if (!correctSpread) return

            // Record data.
            spread.record.forEach(rec => {
                if (newRecord.length < 15) newRecord.push(rec);
            });

            // Account Data.
            spread.account.forEach(acc => {
                const accObj = {
                    id: acc.id,
                    spreadId: acc.spreadId,
                    name: acc.name,
                    username: acc.username,
                    auth: acc.auth,
                    type: acc.type
                };
                if (clientObject.id === acc.id) return
                if (acc.type === 'master') newAccount.unshift(accObj);
                if (acc.type === 'admin') newAccount.splice(1, 0, accObj);
                if (acc.type === 'user') newAccount.push(accObj);
            });
            newAccount.unshift(clientObject);
        });
        if (!clientObject) return res.send({ success: false, message: 'Failed to log in.'});

        // Send response.
        if (clientObject.type === 'user') {
            return res.send({ 
                success: true, 
                data: {
                    client: clientObject,
                    account: [clientObject],
                    record: []
                }
            });
        }
        return res.send({ 
            success: true, 
            data: {
                client: clientObject,
                account: newAccount,
                record: newRecord
            }
        });
    });
});



// Default Data Request.
router.post('/postSpread', (req, res) => {
    const { id, username } = req.body,
        resArray = [[],[]], newAccount = resArray[0], newRecord = resArray[1];
    let clientObject = false;

    if (username === '') clientObject = true;

    // Find Account Spreadsheet.
    Data.findOne({ id: id }, (err, spread) => {
        if (err) return res.send({ success: false, error: err });

        // Authorize request, and acquire records.
        spread.account.forEach(acc => {
            if (username === acc.username) {
                clientObject = acc;
                if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
            }
        });
        spread.record.forEach(rec => {
            if (newRecord.length < 15) newRecord.push(rec);
        });
        if (!clientObject) return res.send({ success: false, message: 'Client not authorized.' });

        // Spread Data.
        const newSpread = {
            id: spread.id,
            title: spread.title,
            sheet: spread.sheet
        }

        // Account Data.
        spread.account.forEach(acc => {
            const accObj = {
                id: acc.id,
                spreadId: acc.spreadId,
                name: acc.name,
                username: acc.username,
                auth: acc.auth,
                type: acc.type
            };
            if (clientObject.id === acc.id) return
            if (acc.type === 'master') newAccount.unshift(accObj);
            if (acc.type === 'admin') newAccount.splice(1, 0, accObj);
            if (acc.type === 'user') newAccount.push(accObj);
        });
        newAccount.unshift(clientObject);

        // Send Response.
        if (username === '') {
            return res.send({ 
                success: true, 
                data: {
                    spread: newSpread,
                    account: [],
                    record: []
                } 
            });
        }
        if (clientObject.type === 'user') {
            return res.send({ 
                success: true, 
                data: {
                    spread: newSpread,
                    account: [clientObject],
                    record: []
                } 
            });
        }
        return res.send({ 
            success: true, 
            data: {
                spread: newSpread,
                account: newAccount,
                record: newRecord
            } 
        });
    });
});



// Replace Sheet Data.
router.put('/putSheet', (req, res) => {

    const { id, username, password, title, sheet } = req.body,

        idArray = [[],[],[]], 
        existArray = idArray[0], keepArray = idArray[1], existData = idArray[2]

        recArray = [[],[]], allRecord = recArray[0], newRecord = recArray[1], 

        logArray = [[],[],[],[],[],[]],
        titleLog = logArray[4], deleteLog = logArray[3], addLog = logArray[2],
        personLog = logArray[1], metaLog = logArray[0], strLog = logArray[5],

        newSheet = [];

    let clientObject = false,
        newId = 1,
        newPerId = 1,
        newMetaId = 1;

    // Find spreadsheet.
    Data.findOne({ id: id }, (error, spread) => {
        if (error) return res.send({ success: false, error: error });

        let spreadTitle = spread.title;
        if (title) spreadTitle = title

        const newAccount = spread.account;
            newSpread = {
            id: id,
            title: spreadTitle,
            sheet: newSheet
        };

        // Authorize request, acquire IDs, and acquire records.
        spread.sheet.forEach(old => {
            existArray.push(old.id);

            let idPerson = [],
                idMeta = [];

            old.person.forEach(person => {
                idPerson.push(person.id);
            });
            old.meta.forEach(meta => {
                idPerson.push(meta.id);
            });
            existData.push({
                id: old.id,
                person: idPerson,
                meta: idMeta
            });

            sheet.forEach(current => {
                if (old.id === current.id) {
                    keepArray.push(current.id);
                }
            });
        });

        spread.account.forEach(acc => {
            if (username === acc.username && password === acc.password) {
                clientObject = acc;
                if (acc.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
            }
        });

        spread.record.forEach(rec => {
            if (newRecord.length < 15) newRecord.push(rec);
            allRecord.push(rec);
        });
        if (!clientObject) return res.send({ success: false, message: 'Client not authorized.' });

        // Organize new data.
        spread.sheet.forEach(old => {

            // Default add sheet.
            if (sheet.length === 1 && sheet[0].id !== old.id) return newSheet.push(old);

            // Delete sheet.
            if (!keepArray.includes(old.id) && existArray.includes(old.id)) {
                newAccount.forEach(acc => {
                    if (acc.auth.includes(old.id)) acc.auth.splice(acc.auth.indexOf(old.id), 1, 'none');
                });
                return deleteLog.push(`deleted sheet "${old.title}"`);
            }

            sheet.forEach(current => {

                // Existing sheet.
                if (current.id === old.id && keepArray.includes(current.id)) {

                    // Sheet Title
                    if (old.title !== current.title) titleLog.push(`changed "${old.title}" to "${current.title}"`);

                    const currentSheet = {
                        id: current.id,
                        title: current.title,
                        person: old.person,
                        meta: old.meta,
                    };

                    // Compare Person data.
                    currentSheet.person.forEach((oldPerson, index) => {
                        current.person.forEach(currentPerson => {
                            // Modifications
                            if (oldPerson.id === currentPerson.id) {
                                // Delete person.
                                if (currentPerson.name === null) {
                                    personLog.push(`deleted person "${oldPerson.name}"`);
                                    return currentSheet.person.splice(index, 1, '');
                                }
                                // Modify person.
                                if (oldPerson.name !== currentPerson.name || oldPerson.phoneTag !== currentPerson.phoneTag || oldPerson.extension !== currentPerson.extension || oldPerson.room !== currentPerson.room || oldPerson.note !== currentPerson.note) {
                                    personLog.push(`modified person "${oldPerson.name}"`);
                                    return currentSheet.person.splice(index , 1, currentPerson);
                                }
                            }
                        });
                    });
                    // Remove string values.
                    for (let index = currentSheet.person.length; index > 0; index--) {
                        if (currentSheet.person[index] === '') currentSheet.person.splice(index, 1);
                    }
                    // New Person data.
                    current.person.forEach(currentPerson => {
                        existData.forEach(data => {
                            if (current.id !== data.id) return
                            if ((typeof currentPerson.id) !== 'string') return
                            while (data.person.includes(newPerId)) newPerId++;

                            const newPerson = {
                                id: newPerId,
                                name: currentPerson.name,
                                phoneTag: currentPerson.phoneTag,
                                extension: currentPerson.extension,
                                room: currentPerson.room,
                                note: currentPerson.note
                            }
                            data.person.push(newPerId);

                            personLog.push(`added person "${newPerson.name}"`);
                            currentSheet.person.push(newPerson);
                        });
                    });

                    // Compare Meta data.
                    currentSheet.meta.forEach((oldMeta, index) => {
                        current.meta.forEach(currentMeta => {
                            // Modifications
                            if (oldMeta.id === currentMeta.id) {
                                // Delete meta.
                                if (currentMeta.line === null && currentMeta.number === null) {
                                    metaLog.push(`deleted line "${oldMeta.line}"`);
                                    return currentSheet.meta.splice(index, 1, '');
                                }
                                // Modify meta.
                                if (oldMeta.line !== currentMeta.line || oldMeta.number !== currentMeta.number) {
                                    metaLog.push(`modified line "${oldMeta.line}"`);
                                    return currentSheet.meta.splice(index, 1, currentMeta);
                                }
                            }
                        });
                    });
                    // Remove string values.
                    for (let index = currentSheet.meta.length; index > 0; index--) {
                        if (currentSheet.meta[index] === '') currentSheet.meta.splice(index, 1);
                    }
                    // New Meta data.
                    current.meta.forEach(currentMeta => {
                        existData.forEach(data => {
                            if (current.id !== data.id) return
                            if (typeof currentMeta.id !== 'string') return
                            while (data.meta.includes(newMetaId)) newMetaId++;

                            const newMeta = {
                                id: newMetaId,
                                line: currentMeta.line,
                                number: currentMeta.number
                            }
                            data.meta.push(newMetaId);
                            
                            metaLog.push(`added line "${newMeta.line}"`);
                            currentSheet.meta.push(newMeta);
                        });
                    });

                    currentSheet.person.sort((a, b) => a.name.localeCompare(b.name));
                    currentSheet.meta.sort((a, b) => a.line.localeCompare(b.line));
                    newSheet.push(currentSheet);
                }
            });
        });

        // New sheet.
        sheet.forEach(current => {
            if ((typeof current.id) !== 'string') return
            while (existArray.includes(newId)) newId++;

            const addSheet = {
                id: newId,
                title: current.title,
                person: current.person,
                meta: current.meta,
            };

            addSheet.person.sort((a, b) => a.name.localeCompare(b.name));
            addSheet.meta.sort((a, b) => a.line.localeCompare(b.line));

            newSheet.push(addSheet);
            existArray.push(newId);
            addLog.push(`added sheet "${current.title}"`);
        });

        newSheet.sort((a, b) => a.title.localeCompare(b.title));

        // Construct record log.
        logArray.forEach((array, index) => {
            if (array.length === 0 || index === logArray.length - 1) return
            let log = 'Account ';
            array.forEach((entry, i) => {
                switch (i) {
                    case (array.length - 1):
                        log += `${entry}.`;
                        break;
                    case (array.length - 2):
                        if (array.length === 2) log += `${entry} and `;
                        if (array.length > 2) log += `${entry}, and `;
                        break;
                    default:
                        log += `${entry}, `;
                }
            });
            strLog.unshift(log);
        });

        // Configure new record entry.
        const newData = spread,
            newEntry = {
              id: clientObject.id,
              name: clientObject.name,
              log: strLog,
              type: 'account',
              timestamp: Date()
            };
        newRecord.unshift(newEntry);
        allRecord.unshift(newEntry);

        // Configure new Data Schema.
        newData.id = id;
        newData.title = title;
        newData.sheet = newSheet;
        newData.account = newAccount;
        newData.record = allRecord;

        // Save Data Schema.
        Data.replaceOne({ _id: spread._id }, newData, err => {
            if (err) return res.send({ success: false, error: err });
            if (clientObject.type === 'user') {
                return res.send({ 
                    success: true,
                    data: {
                        spread: newSpread,
                        account: [clientObject],
                        record: [],
                    } 
                });
            }
            return res.send({ 
                success: true,
                data: {
                    spread: newSpread,
                    account: newAccount,
                    record: newRecord,
                } 
            });
        });
    });
});



// Replace Account Data.
router.put('/putAccount', (req, res) => {

    const { id, username, password, account } = req.body,
        idArray = [[],[]], existArray = idArray[0], keepArray = idArray[1],
        recArray = [[],[]], allRecord = recArray[0], newRecord = recArray[1],
        logArray = [[],[],[],[],[],[]],
        clientLog = logArray[4], deleteLog = logArray[3], addLog = logArray[2],
        authLog = logArray[1], typeLog = logArray[0], strLog = logArray[5],
        newAccount = [];
    let clientObject = false,
        newId = 1;

    // Find spreadsheet.
    Data.findOne({ id: id }, (err, spread) => {
        if (err) return res.send({ success: false, error: err });

        // Authorize request, acquire IDs, and records.
        spread.account.forEach(old => {
            existArray.push(old.id);

            if (username === old.username && password === old.password) {
                if (old.auth.includes('lock')) return res.send({ success: false, message: 'Account is locked.' });
                clientObject = old;
            }

            account.forEach((current, i) => {
                if (old.id === current.id) {
                    keepArray.push(old.id);
                }
            });
        });

        spread.record.forEach(rec => {
            if (!existArray.includes(rec.id)) existArray.push(rec.id);
            if (newRecord.length < 14) newRecord.push(rec);
            allRecord.push(rec);
        });
        if (!clientObject) return res.send({ success: false, message: 'Client not authorized.' });

        // Organize data.
        spread.account.forEach(old => { 

            // Default add account.
            if (clientObject.type ==='user' && old.id !== clientObject.id) return newAccount.push(old);

            // Delete Account
            if (!keepArray.includes(old.id) && existArray.includes(old.id)) {
                if (old.id === clientObject.id) {
                    clientObject = {
                        id: '',
                        spreadId: id,
                        name: old.name,
                        username: '',
                        password: '',
                        type: '',
                        auth: []
                    };
                    return clientLog.push(`deleted client account`);
                }
                return deleteLog.push(`deleted account "${old.username}"`);
            }
            
            account.forEach(current => {
                // Use old password if no current password.
                let objPassword = old.password;
                if (current.password) objPassword = current.password;

                const currentPerson = {
                    id: current.id,
                    spreadId: id,
                    name: current.name,
                    username: current.username,
                    password: objPassword,
                    auth: current.auth,
                    type: current.type
                };

                // Existing account.
                if (old.id === current.id && keepArray.includes(current.id)) {

                    // Client Account
                    if (current.id === clientObject.id) {
                        clientObject = currentPerson;
                        if (old.username !== clientObject.username) clientLog.unshift(`changed username to "${clientObject.username}"`);
                        if (old.password !== clientObject.password)clientLog.unshift('changed password');
                        if (old.name !== clientObject.name) clientLog.unshift(`changed name to "${clientObject.name}"`);
                    } else {

                        // Account Authority
                        if (!old.auth.includes('lock') && current.auth.includes('lock')) authLog.push(`locked "${old.username}"`);
                        if (old.auth.includes('lock') && !current.auth.includes('lock')) authLog.push(`unlocked "${old.username}"`);
                        if (!old.auth.includes(current.auth[0])) {
                            if (current.auth[0] === 'full') authLog.push(`reauthorized "${old.username}" to Full`);
                            if (current.auth[0] === 'none') authLog.push(`reauthorized "${old.username}" to None`);
                            spread.sheet.forEach(sheet => {
                                if (current.auth[0] === sheet.id) authLog.push(`reauthorized "${current.username}" to "${sheet.title}"`);
                            });
                        }

                        // Account Type
                        if (old.type !== current.type) {
                            if (current.type === 'admin') typeLog.push(`changed "${old.username}" account to Admin`);
                            if (current.type === 'user') typeLog.push(`changed "${old.username}" account to User`);
                        }
                    }
                    newAccount.push(currentPerson);
                }
            });
        });

        // New account.
        account.forEach(current => {

            if ((typeof current.id) !== 'string') return
            while (existArray.includes(newId)) newId++;

            const addPerson = {
                id: newId,
                spreadId: id,
                name: current.name,
                username: current.username,
                password: current.password,
                auth: current.auth,
                type: current.type
            };
            
            newAccount.push(addPerson);
            existArray.push(newId);
            addLog.push(`added account "${current.username}"`);
        });

        // Check client username in new account array.
        newAccount.forEach(current => {
            if (current.id === clientObject.id) return
            if (current.username === clientObject.username) return res.send({ success: false, message: 'Username is already being used.' });
        })

        // Construct record log.
        logArray.forEach((array, index) => {
            if (array.length === 0 || index === logArray.length - 1) return
            let log = 'Account ';
            array.forEach((entry, i) => {
                switch (i) {
                    case (array.length - 1):
                        log += `${entry}.`;
                        break;
                    case (array.length - 2):
                        if (array.length === 2) log += `${entry} and `;
                        if (array.length > 2) log += `${entry}, and `;
                        break;
                    default:
                        log += `${entry}, `;
                }
            });
            strLog.unshift(log);
        });

        // Configure new record entry.
        const newData = spread,
            newEntry = {
              id: clientObject.id,
              name: clientObject.name,
              log: strLog,
              type: 'account',
              timestamp: Date()
            };
        newRecord.unshift(newEntry);
        allRecord.unshift(newEntry);

        // Configure new Data Schema.
        newData.id = id;
        newData.title = spread.title;
        newData.sheet = spread.sheet;
        newData.account = newAccount;
        newData.record = allRecord;

        // Save Data Schema.
        Data.replaceOne({ _id: spread._id }, newData, error => {
            if (error) return res.send({ success: false, error: error });
            if (clientObject.type === 'user') {
                return res.send({ 
                    success: true, 
                    data: {
                        client: clientObject,
                        account: [clientObject],
                        record: []
                    }
                });
            }
            return res.send({ 
                success: true, 
                data: {
                    client: clientObject,
                    account: newAccount,
                    record: newRecord
                }
            });
        });
    });
});



// Filter Record
router.post('/postRecord', (req, res) => {
    const { id, user, type, amount, index } = req.body,
        newDisplay = [],
        existArray = [];

    Data.findOne({ id: id }, (err, spread) => {
        if (err) return res.send({ success: false, error: err });

        spread.account.forEach(acc => existArray.push(acc.id));

        for (var i = index; newDisplay.length < amount; i++) {
            let record = spread.record[i];
            if (user === record.id || user === 'all' || user === 'deleted') {
                if (type === record.type || type === 'all') {
                    if (user !== 'deleted') {
                        newDisplay.push(record);
                    } else {
                        if (!existArray.includes(record.id)) newDisplay.push(record);
                    }
                }
            }
            if (i === spread.record.length - 1) return res.send({ success: true, data: newDisplay});
        }
        return res.send({ success: true, data: newDisplay });
    });
});



// Add Spreadsheet
// router.post('/postData', (req, res) => {
//     // A new instance of the Mongoose Schema which we will send to the database.
//     let newData = new Data();

//     // Pull the ID and message from the body of the request.
//     const { id, title, sheet, account, record } = req.body;

//     // Configure the Schema object.
//     newData.id = id;
//     newData.title = title;
//     newData.sheet = sheet;
//     newData.account = account;
//     newData.record = record;

//     // To save to the database.
//     newData.save(err => {
//         if (err) {
//            return res.send({ success: false });
//         } else return res.send({ success: true });
//     });
// });



// Delete Spreadsheet
// router.delete('/deleteData', (req, res) => {
//     Data.deleteOne({ id: req.body.id }, err => {
//         if (err) {
//             return res.send({ success: false, error: err });
//         } else {
//             return res.send({ success: true });
//         }
//     });
// });

// Tell Express to use use cors in te router.
app.use(cors());

// Tell Express to use a certain path and to use the router we set up.
app.use('/api', router);

// Tell Express to listen for requests on the appropriate port.
app.listen(API_PORT, () => console.log('LISTENING ON PORT: ' + API_PORT));
