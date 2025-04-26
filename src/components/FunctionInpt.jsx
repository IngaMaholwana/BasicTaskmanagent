import React, { useState } from 'react';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, inputVal]);
      setInputVal('');
    }
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => prevTodos.slice(0, -1)); // remove the last todo
  };

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleDeleteSubmit} disabled={todos.length === 0}>
          Delete
        </button>
      </form>

      <h4>All the tasks!</h4>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li> // Using index as key because text might repeat
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
