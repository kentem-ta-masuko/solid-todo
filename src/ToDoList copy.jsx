import { For } from 'solid-js';
import { createStore } from 'solid-js/store';

const initialState = [...Array(20000)].map((_, index) => {
        return {
            task: `Task ${index} です`,
            isCompleted: false,
        }
    });

const ToDoList2 = () => {
     const [todos, setTodos] = createStore(initialState);
     let inputElement;

     const handleAddTask = () => {
        if (!inputElement.value) return;
        const newTask = {
            task: inputElement.value,
            isCompleted: false,
        }

        setTodos(prevTodos => [...prevTodos, newTask]);
        inputElement.value = '';
    }

    const handleRemoveTask = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index(), 1);
        setTodos(newTodos);
    }

    const handleUpdateTask = (index) => {
        const newTodos = todos.map((todo, todoIndex) => {
            if (todoIndex === index()) {
                console.log(111);
                todo.isCompleted = !todo.isCompleted
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
                <For each={todos}>{ (todo, index) => (
                    <li key={index()}
                        style={{ textDecorationLine: todo.isCompleted ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
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
export default ToDoList2;