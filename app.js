/**
 * app.js
 * Author: Sean Lecky
 * Version: 0.0.1
 * Entry point for app framework, include modules and server config,
 * initialize app through express constructor
 */

var express = require('express')
    jade = require('jade')
  , mongoose = require('mongoose')
  , crud = require('url-express-crud')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , _document = require('./models/_document')
  , DocumentInMemoryProvider = require('./providers/_document');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  // Use jade template engine to render html
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  // Middleware that allows RESTful behaviour
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Defines route that responds to GET
app.get('/', routes.index);
app.get('/users', user.list);

// CRUD with url-express-crud
var modelCrudRoutes = new crud.CRUDRouter( {
  app: app,
    Model: _document,
    templates: {
      rootDir: 'documents/',
    }
    // Base URI override
    // Context variable name override
    // Context variable names override
    // Config lib for persisting retrieved data
    , routeBaseUri: '/documents/'
    , resourceRequestParamName: 'document'
    , resourceRequestParamNamePlural: 'documents'
    , controller: new crud.BaseResourceController({
        resourceProvider: new DocumentInMemoryProvider()
    })
});

// R E S T api CRUD operations affecting _document object model

app.get('/api', function(req, res) {
  res.send('Ensemble Framework API running...');
});

// Create Method
app.post('/api/documents', function(req, res) {

  var _doc;
  console.log("POST: ");
  console.log(req.body);
  _doc = new _document({
      primary_names: req.body.primary_names
    , secondary_names: req.body.secondary_names
    , injuction_lifted: req.body.injuction_lifted
    , injunction_date: req.body.injunction_date
    , court: req.body.court
    , judge: req.body.judge
    , details: req.body.details
  });

  _doc.save(function(err){
    if(!err) {
      return console.log("document created");
    } else {
      return console.log(err);
    }
  });
  return res.send(_doc);
});

// Read Method (list)
app.get('/api/documents', function(req, res) {

  return _document.find( function(err, _docs) {
    if(!err) {
      return res.send(_docs);
    } else {
      return console.log(err);
    }
  });
});

// Read Method (get)
app.get('/api/doucments/:id', function(req, res) {

  _document.findById(req.params.id, function(err, _doc) {
    if(err) {
      return res.send(_doc);
    } else {
      return console.log(err);
    }
  });
});

// Update multiple documents
app.put('/api/documents', function(req, res) {

  var i, len = 0;
  console.log("update array req.body._docs");
  console.log(Array.isArray(req.body._docs));
  console.log(req.body._docs);

  if(Array.isArray(req.body._docs)) {
    len = req.body._docs.length;
  }
  for(i = 0; i < len; i++) {
    console.log("UPDATE document with ID:");
    for(var id in req.body._docs[i]) {
      console.log(id);
    }
    _document.update({"_id": id}, req.body._docs[i][id], function(err, numAffected) {
      if(err) {
        console.log("UPDATE ERROR!");
        console.log(err);
      } else {
        console.log("updated number: " + numAffected);
      }
    });
  }
    return res.send(req.body._docs);
  });

// Update single document
app.put('/api/documents/:id', function(req, res) {

  return _document.findById(req.params.id, function(err, _doc) {
    _doc.primary_names = req.body.primary_names;
    _doc.secondary_names = req.body.secondary_names;
    _doc.injuction_lifted = req.body.injuction_lifted;
    _doc.injunction_date = req.body.injunction_date;
    _doc.court = req.body.court;
    _doc.judge = req.body.judge;
    _doc.details = req.body.details;
    return _doc.save(function(err) {
      if(!err) {
        console.log("document updated");
      } else {
        return console.log(err);
      }
      return res.send(_doc);
    });
  });
});

// Delete all documents
app.delete('/api/document', function(req, res) {

  _document.remove(function(err) {
    if(err) {
      console.log("all documents removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});

//Delete single document
app.delete('/api/documents', function(req, res) {
  return _document .findById(req.params.id, function(err) {
    return _doc.remove(function(err) {
      if(!err) {
        console.log("document removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// TO DO: S E A R C H

// Check app is listening on port at top level 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log("Running Express %s, Jade %s, Mongoose %s, Ensemble Framework API running...", express.version, jade.version, mongoose.version);
});
