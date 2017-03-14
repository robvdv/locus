define([
	'underscore',
	'app/events',
	'app/const',
	'app/db',
	'BackbonePouch',
	'app/model/pin'

],
	function (
		_,
		events,
		CONST,
		db,
		BackbonePouch,
	    Pin
		) {

		var that = Backbone.Model.extend({

			// Reference to this collection's model.
			model: Replication,

			// Include replications in Map Reduce response. Order by `url`.
			pouch: {
				options: {
					query: {
						include_docs: true,
						fun: {
							map: function(doc) {
								if (doc.type === 'replication') {
									emit(doc.url, null);
								}
							}
						}
					},
					changes: {
						include_docs: true,
						filter: function(doc) {
							return doc._deleted || doc.type === 'replication';
						}
					}
				}
			},

			// parse view result, use doc property injected via `include_docs`
			parse: function(result) {
				return _.pluck(result.rows, 'doc');
			},

			// Replications are sorted by url.
			comparator: function(replication) {
				return replication.get('url');
			}

		});

		// Create global collection of **Replications**.
		var Replications = new ReplicationList;


		// Replication Item View
		// ---------------------

		// The DOM element for a replication item...
		var ReplicationView = Backbone.View.extend({

			//... is a list tag.
			tagName:  "li",

			// Cache the template function for a single item.
			template: _.template($('#replication-item-template').html()),

			// The DOM events specific to an item.
			events: {
				"click a.destroy" : "clear"
			},

			// The ReplicationView listens for changes to its model, re-rendering. Since there's
			// a one-to-one correspondence between a **Replication** and a **ReplicationView** in this
			// app, we set a direct reference on the model for convenience.
			initialize: function() {
				this.model.bind('change', this.render, this);
				this.model.bind('destroy', this.remove, this);
			},

			// Re-render the titles of the replication item.
			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},

			// Remove the item, destroy the model.
			clear: function() {
				this.model.destroy();
			}

		});


		});

		return that;
	});
