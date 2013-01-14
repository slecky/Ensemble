/**
 * providers/_document.js
 * Author: Sean Lecky
 * Version: 0.0.1
 * DocumentInMemoryProvider class, implementation of <AbstractResourceProvider> interface for in memory storage.
 */

var AbstractResourceProvider = require('url-express-crud').AbstractResourceProvider;

var _document = function(D) {
  this.id = this._id = D._id || 0;
  this.primary_names = D.primary_names;
  this.secondary_names = D.secondary_names;
  this.injunction_lifted = D.injunction_lifted;
  this.injunction_date = D.injunction_date || new Date();
  this.court = D.court;
  this.judge = D.judge;
  this.details = D.details;

  this.isNew = function() {
    return this._id > 0;
  }();
};

var DocumentInMemoryProvider = function(config) {
  var doc_1 = {
      _id: '1'
    , primary_names: 'Sean Lecky'
    , secondary_names: 'Kweku Hagen'
    , injunction_lifted: 'false'
    , injunction_date: '10/01/2013'
    , court: 'Manchester Civil Justice Centre'
    , judge: 'M . John Sherman'
    , details: 'Dummy data for injunction database internal framework.'
  },

  doc_2 = {
      _id: '2'
    , primary_names: 'Kweku Hagen'
    , secondary_names: 'Sean Lecky'
    , injunction_lifted: 'true'
    , injunction_date: '05/01/2012'
    , court: 'Manchester Civil Justice Centre'
    , judge: 'M . John Sherman'
    , details: 'Dummy data for injunction database internal framework.'
  },

  doc_3 = {
     _id: '3'
    , primary_names: 'Sean Lecky'
    , secondary_names: 'Kweku Hagen'
    , injunction_lifted: 'true'
    , injunction_date: '15/10/2011'
    , court: 'Manchester Civil Justice Centre'
    , judge: 'M . John Sherman'
    , details: 'Dummy data for injunction database internal framework.'
  };

  this.documents = [new _document(doc_1), new _document(doc_2), new _document(doc_3)];

 };

// Extends AbstractResrouceController class (conforms to its API)
DocumentInMemoryProvider.prototype = AbstractResourceProvider;

// <AbstractResourceController> interface implementation
DocumentInMemoryProvider.prototype = {

  _get: function(conditions) {
    var documents = []
    , ckeys = Object.key(conditions)
    , ckeysTotal = ckeys.length
    , matchDocument = function(doc, iteration) {
      return function(key) {
        var condition = (ckeysTotal === ++iteration) && (conditions[key] === doc[key]);

        if(condition) {
          documents.push(new document(doc));
        }
      };
    };

    if (Object.keys(conditions).length) {
      for (var i = 0, iteration, total = this.documents.length; i < total; i++) {
        iteration = 0;

        // Match conditions with properties of document object
        ckeys.forEach(matchDocument(this.documents[i], iteration));
      }
    }
    
    return documents;
  
  }

  // Retrieve all records that match query provided
  // @param conditions = JSON key/value pair
  , find: function(conditions, callback) {
    var products = Object.keys(conditions).length ? this._get(conditions) : this.documents;
    return callback.call(null, null, documents);
  }

  , findOne: function(conditions, callback) {
    var documents = this._get(conditions)
      , _document = documents.length ? documents[0] : null;
    return callback.call(null, null, _document); 
  }

  // Save an instance of document
  , save: function(resourceJson, fn) {
    var _document = new document(resourceJson);
    this.documents.push(_document);
    return fn.call(null, null, _document);
  }

  // Update an instance
  , update: function(resourceJson, newResource, fn) {
    var _document = this._get({_id: resourceJson._id})[0];

    for(var i = 0, total = this.documents.length; i < total; i++) {
      if(this.documents[i]._id === _document._id) {

        this.documents[i] = newResource;
      }
    }

    return fn.call(null. null, _document);

  }

  // Delete from configured store
  , delete: function(conditions, callback) {
    var products = this._get(conditions);

    if(documents.length == 1) {
      for(var i = 0, total = this.documents.length; i < total; i ++) {
        if (this.documents[i]._id === documents[0]._id) {
          this.documents.splice(i, 1);
          break;
        }
      }
    }

    return callback.call(null, null, documents[0]);
  }
};

exports = module.exports = DocumentInMemoryProvider;