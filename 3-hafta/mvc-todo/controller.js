// Controller: Model ve View arasında köprü
window.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    function render() {
        todoList.innerHTML = '';
        Model.todos.forEach((todo, i) => {
            const li = document.createElement('li');
            if (todo.completed) li.classList.add('completed');
            const span = document.createElement('span');
            span.textContent = todo.text;
            span.onclick = () => { Model.toggle(i); render(); };
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Sil';
            delBtn.className = 'delete-btn';
            delBtn.onclick = () => { Model.remove(i); render(); };
            li.appendChild(span);
            li.appendChild(delBtn);
            todoList.appendChild(li);
        });
    }

    addBtn.onclick = () => {
        const value = input.value.trim();
        if (!value) return;
        Model.add(value);
        input.value = '';
        render();
    };
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') addBtn.onclick();
    });
    render();
});
