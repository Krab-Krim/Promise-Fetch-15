const TODOS_URL = 'https://jsonplaceholder.typicode.com/users';

const createTodoElement = (text) => {
    const todoElem = document.createElement('li'),
        todoElementAnchor = document.createElement('a');

    todoElementAnchor.href = '#';
    todoElementAnchor.textContent = text;
    todoElem.append(todoElementAnchor);

    return todoElem;
}

const toggleLoader = () => {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.hasAttribute('hidden');
    if (isHidden) {
        loaderHTML.removeAttribute('hidden')
    } else {
        loaderHTML.setAttribute('hidden', '');
    }
}

const dataContainer = document.querySelector('#data-container');

const getAllTodos = () => {
    toggleLoader();
    const result = fetch(TODOS_URL, {
        method: 'GET',
    });
    result
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }
            return response.json();
        })
        .then((todos) => {
            todos.forEach((todo) => {
                const todoHTML = createTodoElement(todo.name);
                dataContainer.append(todoHTML);
            })
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            toggleLoader();
        })
}

getAllTodos();