var $ = require('jquery');

module.exports = {
    setTodos: function(todos){
        if($.isArray(todos)){
            // Does not accept array or object
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    },
    getTodos: function(){
        var stringTodos = localStorage.getItem('todos');
        var todos = [];

        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {
            // Do nothing
        }

        return $.isArray(todos) ? todos: [];
    },
    filterTodos: function(todos, showCompleted, searchText) {
        var filteredTodos = todos;

        // Filter by showCompleted
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        filteredTodos = filteredTodos.filter((todo) => {
            var text = todo.text.toLowerCase();
            // If true it stay in the array if false it gets removed
            // Index returns -1 if it was NOT found
            return searchText.length === 0 || text.indexOf(searchText) > -1;
        });

        // Sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if(!a.completed && b.completed){
                // Telling sort that a should come before b
                return -1;
            } else if(a.completed && !b.completed){
                // Telling sort that b should come before a
                return 1;
            } else {
                // No change
                return 0;
            }
        });

        return filteredTodos;
    }
};