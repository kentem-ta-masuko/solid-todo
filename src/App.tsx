import type { Component } from 'solid-js';
import ToDoList from './ToDoList copy';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div>
      <ToDoList copy />
    </div>
  );
};

export default App;
