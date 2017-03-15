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
		that.chats.fetch(that.chatId);
	};

	that.onShow = function(params) {
		console.log("onShow reg");

		var paramsArr = params.split('=');
		that.groupId = null;
		that.userId = null;
		if (paramsArr[0] === 'user') {
			that.userId = paramsArr[1];
		} else if (paramsArr[0] === 'group') {
			that.groupId = paramsArr[1];
		}
		that.initialize();
		that.chats.setUserId(that.userId);
		that.chats.setGroupId(that.groupId);
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
			senderDisplayName: account.getUserName(),
			message: message,
			owner: account.getUserId(),
			timestamp: new Date().getTime(),
			type: 'chat'  // move to Model
		};
		that.groupId = null;
		that.userId = null;

		if (that.chats.getGroupId()) {
			chatData.subkey = that.chats.getGroupId();
		} else if (that.chats.getUserId()) {
			chatData.recipientId = that.chats.getUserId();
		}

		that.chats.create(chatData, {wait: true});
	};

	that.name = 'chat';
	baseScreen.registerScreen(that);

	return that;


});