var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    // Gets called before each test
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

   it('should exist', () => {
       expect(TodoAPI).toExist();
   });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [{
                id: 23,
                text: 'test all files',
                completed: false
            }];

            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            // toEqual checks compares the value only
            // toBe check if they are the same object or array
            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
           var badTodos = {a: 'b'};
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);

        });
    });

    describe('getTodos', () => {
        it('should return empty array for bad local storage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it('should return todo if valid array in local storage', () => {
            var todos = [{
                id: 23,
                text: 'test all files',
                completed: false
            }];

            localStorage.setItem('todos', JSON.stringify(todos));

            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);
        });
    });


    describe('filterTodos', () => {
        var todos = [{
            id: 23,
            text: 'test all files',
            completed: true
        },
        {
            id: 25,
            text: 'test some text',
            completed: false
        },
        {
            id: 24,
            text: 'Another text here',
            completed: true
        }
        ];

        it('should return all items if show completed is true', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true,  '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return uncomplete todos', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, false,  '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true,  '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filteredTodos.length).toBe(1);
        });

        it('should return all todos if search text is empty', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true,  '');
            expect(filteredTodos.length).toBe(3);
        });
    });

});