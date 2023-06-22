//bring in elements from todo list
const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUL = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e)

    addTodo();
})

function addTodo(todo) {
    //saving the input value (text) to a variable
    let todoText = input.value

    //checking if a todo exists
    if(todo) {
        //set the value of inpu to the value of todo.text
        todoText = todo.text 
    }
    
    // if the text exists 
    if(todoText) {
        // create a new list item
        const todoEL = document.createElement('li');

        // if there is a todo AND its completed    
        if(todo && todo.completed) {
            // add strike through class
            todoEL.classList.add('completed')
        }
        //make the text of li same as input value
            todoEL.innerText = todoText;
        // append the todo li item to the todo unordered list
            todoUL.appendChild(todoEL);
            //clear out after enter
            input.value = " "

            todoEL.addEventListener('click', () => {
                todoEL.classList.toggle('completed');
                updateLS();
            })
            //move list item
             todoEL.addEventListener('contextmenu', (e)=> {
                e.preventDefault();

                //remove list item
                 todoEL.remove()
                 updateLS();
             })
             
    }
    updateLS()
    
}


function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = []

    todosEl.forEach((todoEl)=> {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
