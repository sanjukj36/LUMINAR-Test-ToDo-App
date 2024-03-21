import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './TodoSlice';
import './App.css'
import { Table } from 'react-bootstrap';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className='Container p-5 mt-5'>
      <div className='mb-5 '>
        <h1>Todo App</h1>
        <input 
        className='mt-3'
        
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter todo"
        />
        {/* <input type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter todo" class="form-control" /> */}

        <button className='btn btn-success ms-4' onClick={handleAddTodo}>Submit</button>

      </div>


      <h2 className='text-info'>ToDo List</h2>



      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Completed</th>
            <th>ToDo Name</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr>
              <td> <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              </td>
              <td>{todo.text}</td>
              <td>
                <button className='btn' onClick={() => handleDeleteTodo(todo.id)}><i class="fa-solid fa-trash text-danger"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className='text-info'>Completed ToDo</h2>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ToDo Name</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {todos.filter(todo => todo.completed).map(todo => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td>
                <button className='btn' onClick={() => handleDeleteTodo(todo.id)}>
                  <i className="fa-solid fa-trash text-danger"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default App;
