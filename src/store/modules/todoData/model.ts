export type ID = string | number

export type Todo = {
    id: ID
    completed: boolean
}

export type Todos = Array<Todo>