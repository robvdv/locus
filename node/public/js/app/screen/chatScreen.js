define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/events',
	'app/account',
	'app/db',
	'app/model/chat',
	'app/model/chats',
	'app/view/chatView',
	'app/view/chatsView',
	'app/view/messageView'
],
function (
	_,
	Backbone,
	baseScreen,
	events,
	account,
	db,
	Chat,
	Chats,
	ChatView,
	ChatsView,
	MessageView
) {

	var ChatScreen = Backbone.View.extend({
		el: '#chat-wrapper',
		events: {
		}
	});

	var that = new ChatScreen();

	that.initialize = function() {
		that.chats = new Chats();
		that.chatView = new ChatsView({
			el: '.chat-list',
			collection: that.chats
		});

		that.chats.bind('add', that.addChatToView);
	};

/*	that.MessageView = new MessageView({
		el: '.new-message-wrapper',
		addMessageCallback: that.addMessage
	});*/

	//events.on('contacts:loaded', that.renderContacts);

	that.fetchChats = function() {
		that.chats.fetch({
			reset: true
		});
	};

	that.onShow = function(id) {
		console.log("onShow reg");
		that.initialize();
		that.chats.setRecipientId(id);
		that.bindDomElements();
		that.bindDomEvents();
		that.fetchChats();
		events.on('chat:change', that.fetchChats);
	};

	that.addChatToView = function(chat) {
		var chatView = new ChatView({model: chat.toJSON()});
		that.chatView.$el.append(chatView.render());
	};

	that.bindDomElements = function() {
		that.$els = {};
		that.$els.newChatText = $('#textfield_new_chat');
	};

	that.bindDomEvents = function() {
		that.$els.newChatText.on('keyup', that.messageKeyUp);
	};

	that.messageKeyUp = function(event) {
		if (event.keyCode == 13) {
			if (that.$els.newChatText.val().length > 0) {
				that.createMessage(that.$els.newChatText.val());
				that.$els.newChatText.val('');
			}
		}
	};

	that.createMessage = function(message) {
		console.log('create message:' + message)

		var chatData = {
			//_id: new Date().getTime(),
			recipientId: that.chats.getRecipientId(),
			senderId: account.getUserId(),
			senderDisplayName: account.getUserName(),
			message: message,
			owner: account.getUserId(),  // roll into senderId or the other way around???
			timestamp: new Date().getTime(),
			type: 'chat'  // move to Model
		};

		that.chats.create(chatData, {wait: true});

		//db.createDoc(chatData);

/*

			var url = model.get('url'),
				pushResps = this.pushResps,
				pullResps = this.pullResps,
				renderStats = _.bind(this.renderStats, this);

			PouchDB.replicate(dbname, url, {
				continuous: true,
				onChange: function(resp) {
					pushResps[url] = resp;
					renderStats();
				}
			});
			PouchDB.replicate(url, dbname, {
				continuous: true,
				onChange: function(resp) {
					pullResps[url] = resp;
					renderStats();
				}
			});
		}
*/


		//var chat = new Chat(chatData);

		//that.chats.add(chat);
	};

	that.name = 'chat';
	baseScreen.registerScreen(that);

	return that;


});