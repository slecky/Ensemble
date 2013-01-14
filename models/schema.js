Schema = mongoose.Schema;

// Schema defined in terms of injunction db, needs
var framework_schema = mongoose.Schema({

  primary_names: String
, secondary_names: String
, injunction_lifted: Boolean
, injunction_date: {type: Date, default: Date.now}
, court: String
, judge: String
, details: String  

});

mongoose.model('schema', framework_schema);
var schema = mongoose.model('schema');

// If error occurs with database models will log to console
schema.on('error', function() {
  console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

exports = module.exports = schema;