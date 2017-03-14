window.comms = (function(){
	var that = {};

	that.init = function(options) {
		that.options = options;
		that.start();
	};

	that.start = function() {
		that.initPoller();
	};

	that.initPoller = function() {
		that.messagePoller = setInterval( that.getMessages, 1000);
	};

	that.sendMessage = function(username, message) {
		var data = {
			username: username ? username : 'Anon',
			message: message
		};
		$.ajax({
			type: 'POST',
			url: '/api/msg',
			data: JSON.stringify(data),
			success: that.sendMessageCallbackSuccess,
			contentType: 'application/json'
		});

	};

	that.sendMessageCallbackSuccess = function(data, textStatus, jqXHR) {
		console.log('success');
	};

	that.getMessages = function() {
		$.ajax({
			type: 'GET',
			url: '/api/msg',
			success: that.getMessagesCallbackSuccess,
			dataType: 'json'
		});
	};

	that.getMessagesCallbackSuccess = function(data, textStatus, jqXHR) {
		var messages = data.messages;
		that.options.getMessagesCallbackSuccess(messages);
	};



	return that;
})();

window.app = (function(){
	var that = {};
	var comms = window.comms;

	that.init = function() {
		comms.init({
			getMessagesCallbackSuccess: that.getMessagesCallbackSuccess
		});
		that.initElements();
		that.initBindEvents();
	};

	that.initElements = function() {
		that.$els = {};
		that.$els.messageSend = $('#messageSend');
		that.$els.messageSendText = that.$els.messageSend.find('textarea.message');
		that.$els.messageSendButton = that.$els.messageSend.find('button.send');

		that.$els.messages = $('#messages');
		that.$els.messagesList = that.$els.messages.find('ul.messages');

		that.$els.navigation = $('#navigation');
		that.$els.username = that.$els.navigation.find("input.username")
	};
	that.initBindEvents = function() {
		that.$els.messageSendButton.on('click', that.clickMessageSend);
	};

	that.clickMessageSend = function(event) {
		event.stopPropagation();
		comms.sendMessage(that.$els.username.val(), that.$els.messageSendText.val());
		that.$els.messageSendText.val('');
		return false;
	};

	that.getMessagesCallbackSuccess = function(messages) {
		var messageHtml = '';
		_.each(messages, function(message) {
			messageHtml += '<li><span class="username">' + message.username +
				':</span><span class="message-body">' + message.message +
				':</span><span class="angle">' + message.angle + '</li>';
		});
		that.$els.messagesList.html(messageHtml);
	};

	return that;

})();

var uc = window.uc = {};
$(document).ready(function() {
	window.app.init();
	var render = uc.render = renderer();
	render.render({
		type: 'chat',
		message: 'hey'
	})

});