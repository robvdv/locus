define([
	'app/events',
	'app/const',
	'app/account',
	'backbone',
	'pouchdb',
	'pouchdb.find',
	'BackbonePouch'],
function (
	events,
	CONST,
	account,
	Backbone,
	PouchDB,
	pouchdbFind,
	BackbonePouch
) {

	var that = {};

	window.PouchDB = PouchDB;

	that.init = function() {
		PouchDB.plugin(pouchdbFind);

		that.dbLocal = new PouchDB('playa');
		that.dbRemote = new PouchDB('http://localhost:5984/playa');

		Backbone.Model.prototype.idAttribute = '_id';
		Backbone.sync = BackbonePouch.sync({
			db: that.dbLocal,
			listen: true,
			fetch: 'query'
		});

		that.startSync();
		events.trigger('db:ready', {db: that.dbLocal});
	};

	events.on('user:loggedIn', that.init);
	events.on('db:recreate', that.recreate);

	that.setupIndexes = function() {
/*		that.dbLocal.createIndex({
			index: {
				fields: ['display_name']
			}
		}).then(function (result) {
			console.log("a");
		}).catch(function (err) {
			console.log("b");
		});*/
		//that.dbLocal.deleteIndex('itxType');
/*		that.dbLocal.createIndex({
			index: {
				fields: ['type'],
				name: 'itxType',
				ddoc: 'ddType',
				type: 'json'
			}
		}); */

		that.dbLocal.createIndex({
			index: {
				fields: ['type', 'display_name'],
				name: 'itxTypeDisplayName',
				ddoc: 'ddTypeDisplayName',
				type: 'json'
			}
		});
	};

	that.getId = function() {
		return 'mac' + new Date().getTime() + performance.now();
	};

	that.recreate = function() {

		//indexedDB.deleteDatabase('_pouch_burnr');

		$.get('/api/db/recreate', function() {
			console.log('db recreated remotely');
			that.init();
		});
/*

		that.dbLocal.destroy().then(function () {
		    console.log('db destroyed locally');
			$.get('/api/db/recreate', function() {
				console.log('db recreated remotely');
				that.init();
			});
		}).catch(function (err) {
		  // error occurred
		});
*/
	};

	that.createDummyData = function() {
		var alpha = that.createDoc({
			_id: that.getId(),
			type: CONST.data.types.contact,
			display_name: 'Alpha'
		})
	};

	that.createDoc = function(data) {
		that.dbLocal.put(data)
			.then(function (response) {
				console.log('Created: ' + JSON.stringify(data))
				return response;
			}).catch(function (err) {
				console.log('FAILED: ' + JSON.stringify(data))
			});
	};

	that.startSync = function() {

/*		try {
			that.dbLocal.put({
				_id: "_design/app",
				"filters": {
					"sync_user": "function(doc, req) { return (doc.sync_user === req.query.owner) || ('public' === req.query.owner); }"
				}
			}).then(function (response) {
					// handle response
				}).catch(function (err) {
				console.log(err);
			});
		} catch (e) {
			console.log(e);
		}
                                         */
		that.dbLocal.sync(that.dbRemote, {
			live: true,
			retry: true,
			filter: 'app/sync_user',
			query_params: {
				"owner": account.getUserId() }
		}).on('change', that.onDbChange);

		//that.dbLocal.sync(that.dbRemote);

	};

	that.onDbChange = function(result) {
		// WTF is this necessary?
		if (that.containsContact(result.change.docs)) {
			events.trigger('contact:change', {result: result});
		}
		events.trigger('db:change',{result: result});
	};

	that.onDbPaused = function(info) {
		events.trigger('db:paused',{info: info});
	};

	that.onDbActive = function(info) {
		events.trigger('db:active',{info: info});
	};

	that.onDbError = function(err) {
		events.trigger('db:error',{err: err});
	};

	that.docsContain = function(docs, docType) {
		return !!_.find( docs, function(doc) {
			return doc.type === docType;
		})
	};

	that.containsContact = function(docs) {
		return that.docsContain(docs, CONST.data.types.contact);
	};

	that.containsChat = function(docs) {
		return that.docsContain(docs, CONST.data.types.contact);
	};

	that.getContacts = function() {
		var qry = that.dbLocal.find({
			selector: {
				type: {$eq: CONST.data.types.contact},
				display_name: {$gt: ''}
			},
			sort: [ 'type', 'display_name' ]
		}).then(function(result) {
			events.trigger('contacts:loaded', result.docs);
		});
	};

	that.getChats = function() {
		var qry = dbLocal.find({
			selector: {
				type: {$eq: CONST.data.types.chat}
			}
		}).then(function(result) {
			//callback(result.docs);
			events.trigger('chats:loaded', result.docs);
		});
	};

	return that;
});
/*

var DB = (function() {

	var that = {};
	var app = window.app;

	var fish = "page";

	var dbLocal = that.dbLocal = new PouchDB('burnr');
	var dbRemote = that.dbRemote = new PouchDB('http://localhost:5984/burnr');

	that.syncPoll = function() {
		that.dbLocal.sync(that.dbRemote, {
			live: true
		})
		.on('complete', function () {
			console.log('yay!');
			var qry = dbLocal.find({
				selector: {type: {$eq: 'message'}}
			}).then(function(result) {
				app.render.render(result.docs);
			});
		}).on('error', function (err) {
				console.log('boo!');
		});
	};

	that.renderChange = function(change) {
		//app.render.render(change.doc);
		console.log(this.fish)
	};

	that.syncEvents = function() {
		var changes = that.dbLocal.changes({
				since: 'now',
				live: true,
				include_docs: true
			}).on('change', that.renderChange )
			.on('complete', function(info) {
				console.log('info: ' + JSON.stringify(info));
			}).on('error', function (err) {
				console.log(err);
			}
		)
	};

	that.syncPoll();
	that.syncEvents();

	return that;
});
*/


