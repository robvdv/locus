define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/router'],
function (
	_,
	Backbone,
	baseScreen,
	router
) {

/*
	var mainScreen = Backbone.View.extend({
		el: '#main-wrapper',
		events: {
			'click .search-contact': 'searchContacts'
		},

		searchContacts: function(event) {
			event.stopPropagation();
			router.navigate('contacts', {trigger: true, replace: true});
			return false;
		}
	});

	var that = new mainScreen();

	// bindEvents
	//events.on('showScreen:main', );

	that.name = 'main';
	baseScreen.registerScreen(that);
*/

	// not a true screen, just a general DOM event handler
	var that = {};

	that.init = function() {
		that.bindDomElements();
		that.bindEvents();
	};

	that.bindDomElements = function() {
		that.$els = {};
		that.$els.menuWrapper = $('header');
		that.$els.tabs = that.$els.menuWrapper.find('ul.tabs');

		/*$("a[href='#contacts']")


		that.$els.tabContacts = that.$els.tabs.find('[href=#contacts]');
		that.$els.tabChats = that.$els.tabs.find('[href=#chats]');
		that.$els.tabMap = that.$els.tabs.find('[href=#map]');*/
	};

	that.bindEvents = function() {
		that.$els.tabs.find('li a').on('click', function(event) {
			var $el = $(event.currentTarget);
			var link = $el.attr('href').substr(1);
			window.location.hash = '#' + link;
			//baseScreen.showScreen(link);
			//router.navigate(link, {trigger: true, replace: true})
		})
	};

	that.init();


	return that;

});