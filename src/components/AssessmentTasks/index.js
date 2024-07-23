import React, { Component } from 'react';
import './index.css';

class AssessmentTasks extends Component {
  state = {
    tasks: [],
    newTask: { title: '', description: '' },
    editTask: null,
  };

  async componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const response = await fetch('https://fmmoneybackend-6.onrender.com/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const tasks = await response.json();
      this.setState({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  handleAddTask = async (e) => {
    e.preventDefault();
    const { newTask } = this.state;
    try {
      await fetch('https://fmmoneybackend-6.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask),
      });
      this.setState({ newTask: { title: '', description: '' } });
      this.fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  handleUpdateTask = async (e) => {
    e.preventDefault();
    const { editTask } = this.state;
    if (editTask) {
      try {
        await fetch(`https://fmmoneybackend-6.onrender.com/tasks/${editTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(editTask),
        });
        this.setState({ editTask: null });
        this.fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  handleDeleteTask = async (id) => {
    try {
      await fetch(`https://fmmoneybackend-6.onrender.com/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      this.fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (this.state.editTask) {
      this.setState({
        editTask: { ...this.state.editTask, [name]: value }
      });
    } else {
      this.setState({
        newTask: { ...this.state.newTask, [name]: value }
      });
    }
  };

  handleEditClick = (task) => {
    this.setState({ editTask: { ...task } });
  };

  handleCancelEdit = () => {
    this.setState({ editTask: null });
  };

  render() {
    const { tasks, newTask, editTask } = this.state;

    return (
      <div className="task-container">
        <h1>Assessment Tasks</h1>
        <form onSubmit={this.handleAddTask}>
          <h2>Add Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={this.handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add Task</button>
        </form>

        {editTask && (
          <form onSubmit={this.handleUpdateTask}>
            <h2>Edit Task</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editTask.title}
              onChange={this.handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editTask.description}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Update Task</button>
            <button type="button" onClick={this.handleCancelEdit}>Cancel</button>
          </form>
        )}

        <h2>Task List</h2>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => this.handleEditClick(task)}>Edit</button>
              <button onClick={() => this.handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AssessmentTasks;
