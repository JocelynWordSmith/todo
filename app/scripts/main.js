'use strict';

//sets the todo model, which is an individual task on the todo list
var Todo = Backbone.Model.extend({

	initialize: function() {
		this.set({ 
			task: $('.new-todo').val()

		})
	},

	//default fields for color
	defaults: {

		user: 'joshua',
		task:  'hustle, every day',
		done: false,
		color: 'black',

	},

	url: 'http://tiny-pizza-server.herokuapp.com/collections/joshua-todo',

	//tells it that the id has a leading underscore 
	idAttribute: '_id',
});

//sets the collectuon of todo tasks
var Todos = Backbone.Collection.extend({

	model: Todo,

	url: 'http://tiny-pizza-server.herokuapp.com/collections/joshua-todo',

});

//sets the view of the todo tasks that will be shown on the legal pad
var TodoList = Backbone.View.extend({

	template: _.template($('.todo-list').text()),

	events: {
		// 'click .add-task' : 'defaultTask',
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);


		$('.notes').prepend(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	checkForChanges: function() {
		if (this.model.get('task') !== this.$el.find('.task input').val()) {
			this.$el.find('.task input').addClass('changed');
		} else {
			this.$el.find('.task input').removeClass('changed');
		}
	}
});


var newTask = new Todos();

newTask.fetch().done(function() {
	newTask.each(function(todo) {
		new TodoList({
			model: todo
		});
	});
});

$('.add-task').click(function() {
	window.testTask = new Todo();
	console.log(testTask);
	testTask.save();
	$('.notes').html('');
newTask.fetch().done(function() {
	newTask.each(function(todo) {
		new TodoList({
			model: todo
		});
	});
});
});