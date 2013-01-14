/**
 * schema.js
 * Author: Sean Lecky
 * Version: 0.0.1
 * Schema definition to be abstracted out to allow for alternate db integration.
 */

_schema = mongoose.Schema;

// Schema defined in terms of injunction db, id auto assigned?
var _document = mongoose.Schema({

, primary_names: String
, secondary_names: String
, injunction_lifted: Boolean
, injunction_date: {type: Date, default: Date.now}
, court: String
, judge: String
, details: String  

});

mongoose.model('_schema', _document);
var _schema = mongoose.model('_schema');

// If error occurs with database models will log to console
_schema.on('error', function() {
  console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

exports = module.exports = _schema;