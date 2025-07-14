// Model: To-Do verilerini tutar ve yönetir
const Model = {
    todos: [],
    add(todo) {
        this.todos.push({ text: todo, completed: false });
    },
    remove(index) {
        this.todos.splice(index, 1);
    },
    toggle(index) {
        this.todos[index].completed = !this.todos[index].completed;
    }
};
