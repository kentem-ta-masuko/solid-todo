import { createSignal, For } from 'solid-js';

const createTask = (taskName) => {
    const [completed, setCompleted] = createSignal(false);
    return {
        task: taskName,
        completed,
        setCompleted
    }
}

const initialState = [...Array(20000)].map((_, index) => createTask(`Task ${index} です`));

const ToDoList = () => {
     const [todos, setTodos] = createSignal(initialState);
     let inputElement;

     const handleAddTask = () => {
        if (!inputElement.value) return;
        const newTask = createTask(inputElement.value);
        setTodos(prevTodos => [...prevTodos, newTask]);
        inputElement.value = '';
    }

    const handleRemoveTask = (index) => {
        const newTodos = [...todos()];
        newTodos.splice(index(), 1);
        setTodos(newTodos);
    }

    const handleUpdateTask = (index) => {
        const newTodos = todos().map((todo, todoIndex) => {
            if (todoIndex === index()) {
                todo.setCompleted(!todo.completed());
            }
            return todo;
        });
        setTodos(newTodos);
    }

    return (
        <>
            <h1>ToDo List</h1>
            Add Task : <input placeholder="Add New Task" ref={inputElement}/>
            <button onClick={handleAddTask}>Add</button>
            <ul>
                <For each={todos()}>{ (todo, index) => (
                    <li key={index()}
                        style={{'text-decoration-line': todo.completed() ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed()}
                            onChange={() => handleUpdateTask(index)}
                        />
                        {todo.task}&nbsp;
                        <button onClick={() => handleRemoveTask(index)}>
                            X
                        </button>
                    </li>
                )}</For>
            </ul>
        </>
    );
}
export default ToDoList;