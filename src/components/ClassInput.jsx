/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editingIndex: null, // Track which todo is being edited
      editingVal: '',     // Track the value while editing
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const trimmedVal = this.state.inputVal.trim();
    if (trimmedVal !== '') {
      this.setState((state) => ({
        todos: [...state.todos, trimmedVal],
        inputVal: '',
      }));
    }
  }

  handleDelete(index) {
    this.setState((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    }));
  }

  handleEdit(index) {
    this.setState({
      editingIndex: index,
      editingVal: this.state.todos[index],
    });
  }

  handleEditChange(e) {
    this.setState({ editingVal: e.target.value });
  }

  handleEditSubmit(index) {
    const trimmedVal = this.state.editingVal.trim();
    if (trimmedVal !== '') {
      this.setState((state) => {
        const newTodos = [...state.todos];
        newTodos[index] = trimmedVal;
        return {
          todos: newTodos,
          editingIndex: null,
          editingVal: '',
        };
      });
    }
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Show count component */}
        <Count number={this.state.todos.length} />

        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {this.state.editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={this.state.editingVal}
                    onChange={this.handleEditChange}
                  />
                  <button onClick={() => this.handleEditSubmit(index)}>Resubmit</button>
                </>
              ) : (
                <>
                  {todo}
                  <button onClick={() => this.handleEdit(index)}>Edit</button>
                  <button onClick={() => this.handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

// New Count component
class Count extends Component {
  render() {
    return (
      <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        Total tasks: {this.props.number}
      </div>
    );
  }
}

export default ClassInput;
