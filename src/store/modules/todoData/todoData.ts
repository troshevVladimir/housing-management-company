import { ID, Todo } from './model.js'

const housesData = {
    state: {
        todos: [],
    },
    getters: {
        getAllTodos(state: any) {
            return state.todos;
        },
        getTodoById(state: any) {
            return (id: ID) => state.todos.find((todo: Todo) => todo.id === Number(id));
        },
    },
    mutations: {
        addTodo(state: any, todo: Todo) {
            const newTodo = todo;
            newTodo.id = state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 0;
            newTodo.completed = false;
            state.todos.push(newTodo);
        },
        updateTodo(state: any, payload: {id: ID, todo: Todo}) {
            const index = state.todos.findIndex((todo: Todo) => todo.id === Number(payload.id));
            state.todos.splice(index, 1, payload.todo);
        },
        deleteTodo(state: any, id: ID) {
            state.todos = state.todos.filter((todo: Todo) => todo.id !== Number(id));
        }
    },
    actions: {
    },
    namespaced: true
}

export default housesData