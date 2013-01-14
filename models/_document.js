/**
 * framework/_document.js
 * Author: Sean Lecky
 * Version: 0.0.1
 * DB connection, database schema and CRUD functions defined
 */
_schema = require('./schema');
var mongoose = require('mongoose');
// Connection to mongodb will need to be modified based on db type and location
var db = mongoose.createConnection('mongodb://localhost/framework');

// var db = mongoose.connection;

// Error handling for database connection
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function callback() {
  
  // Schema methods, CRUD operations, schema abstracted out to allow for multiple applications

});