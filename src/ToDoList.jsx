import { batch, For } from 'solid-js';
import { createStore } from 'solid-js/store';

const createTask = (taskName) => {
    return {
        task: taskName,
        isCompleted: false
    }
}

const initialState = [...Array(20000)].map((_, index) => createTask(`Task ${index} です`));

const ToDoList = () => {
     const [todos, setTodos] = createStore(initialState);
     let inputElement;

     const handleAddTask = () => {
        if (!inputElement.value) return;
        batch(() => {
            setTodos(todos.length, createTask(inputElement.value));
            inputElement.value = '';
        });
    }

    return (
        <>
            <h1>ToDo List</h1>
            Add Task : <input placeholder="Add New Task" ref={inputElement}/>
            <button onClick={handleAddTask}>Add</button>
            <ul>
                <For each={todos}>{ (todo, index) => (
                    <li key={index()}
                        style={{'text-decoration-line': todo.isCompleted ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={(e) => setTodos(index(), "isCompleted", e.currentTarget.checked)}
                        />
                        {todo.task}&nbsp;
                        <button onClick={() => setTodos((t) => [...t.slice(0, index()), ...t.slice(index() + 1)])}>
                            X
                        </button>
                    </li>
                )}</For>
            </ul>
        </>
    );
}
export default ToDoList;