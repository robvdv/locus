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

		that.startSync();
		events.trigger('db:ready', {db: that.dbLocal});
	};

	events.on('user:loggedIn', that.init);
	events.on('db:recreate', that.recreate);

	that.getId = function() {
		return 'mac' + new Date().getTime() + performance.now();
	};

	that.startSync = function() {
		that.dbLocal.sync(that.dbRemote, {
			live: true,
			retry: true,
			filter: 'app/sync_user',
			query_params: {
				"subkeys": account.getSubscriptionKeys(),
				"owner": account.getUserId() }
		}).on('change', that.onDbChange);
	};

	that.onDbChange = function(result) {
		var entities;
		var dbChanged = false;
		_.each(_.values(CONST.data.types), function(type) {
			entities = that.docsFilter(result.change.docs, type);
			if (entities.length > 0) {
				events.trigger(type + ':change', {add: entities});
				dbChanged = true;
			}
		});
		if (dbChanged) {
			events.trigger('db:change',{result: result});
		}
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

	that.docsFilter = function(docs, docType) {
		return _.filter( docs, function(doc) {
			return doc.type === docType;
		})
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

	that.getContacts = function(callback) {
		var qry = that.dbLocal.find({
			selector: {
				type: {$eq: CONST.data.types.contact},
				display_name: {$gt: ''}
			}
		}).then(function(result) {
			callback(result.docs);
		});
	};
	/*
	 selector: {
	 $and: [{
	 type: {$eq: CONST.data.types.chat},
	 $or: [
	 { recipientId: {$eq: recipientId}},
	 { owner: {$eq: senderId}}
	 ]
	 }]
	 }
	 */

	/*
	 selector: {
	 $and: [{
	 type: {$eq: CONST.data.types.chat},
	 },{
	 $or: [{
	 $and: [{
	 owner: {$eq: recipientId}
	 }, {
	 senderId: {$eq: senderId}
	 }]
	 }, {
	 $and: [{
	 owner: {$eq: senderId}
	 }, {
	 senderId: {$eq: recipientId}
	 }]
	 }]
	 }]
	 }
	 */
	/*
	 selector: {
	 type: {$eq: CONST.data.types.chat},
	 $or: [{
	 $and: [{
	 owner: {$eq: recipientId}
	 }, {
	 recipientId: {$eq: senderId}
	 }]
	 }, {
	 $and: [{
	 owner: {$eq: senderId}
	 }, {
	 recipientId: {$eq: recipientId}
	 }]
	 }]
	 }
	 */
	that.getChatsUser = function(senderId, callback) {
		var recipientId = account.getUserId();
		var qry = that.dbLocal.find({
			selector: {
				type: {$eq: CONST.data.types.chat},
				owner: {$eq: senderId}
			}
		}).then(function(result) {
				callback(result.docs);
			});
	};

	that.getChatsGroup = function(subkey, callback) {
		var qry = that.dbLocal.find({
			selector: {
				type: {$eq: CONST.data.types.chat},
				subkey: {$eq: subkey}
			}
		}).then(function(result) {
				callback(result.docs);
			});
	};

	return that;
});


