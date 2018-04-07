var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var completedTodos = 0,
            totalTodos = this.todos.length;

        this.todos.forEach(function(todo) {
            if (todo.completed)
                completedTodos++;
        });

        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) 
                todo.completed = false;
            else
                todo.completed = true;
        });
    }
};

// var displayTodosButton = document.getElementById("displayTodosButton");
// var toggleAllButton = document.getElementById("toggleAllButton");

// displayTodosButton.addEventListener("click", function() {
//     todoList.displayTodos();
// });

// toggleAllButton.addEventListener("click", function() {
//     todoList.toggleAll();
// });

var handlers = {
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todoUl = document.querySelector("ul");
        todoUl.innerHTML = "";
        
        todoList.todos.forEach(function(todo, idx) {
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";

            if (todo.completed)
                todoTextWithCompletion = "(X) " + todo.todoText;
            else
                todoTextWithCompletion = "( ) " + todo.todoText;

            todoLi.id = idx;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    setupEventListeners: function() {
        var todoUl = document.querySelector('ul');

        todoUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton')
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        });
    }
};

view.setupEventListeners();