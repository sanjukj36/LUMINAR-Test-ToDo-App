import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './TodoSlice';
import './App.css'
import { Table } from 'react-bootstrap';

function App() {
  const [ToDoContent, setToDoContent] = useState('');
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo);

 

  const handleAddTodo = () => {
    if (ToDoContent !== '') {
      console.log(todo);
      dispatch(addTodo({
        id: todo.length+1,
        ToDoContent,
        completed: false,
      }));
      setToDoContent('');
    }
  };

  const handleDelete= id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };


  return (
    <div className='Container p-5 mt-5'>
      <div className='mb-5 '>
        <h1 className='text-warning'>Todo App</h1>
        <input 
        className='mt-3'
        
          type="text"
          value={ToDoContent}
          onChange={e => setToDoContent(e.target.value)}
          placeholder="Enter todo"
        />
        

        <button className='btn btn-success ms-4' onClick={handleAddTodo}>Submit</button>

      </div>


      <h2 className='text-info'>ToDo List</h2>



      <Table striped bordered hover size="sm">
        <thead>
          <tr className='text-center'>
            <th>Completed</th>
            <th>ToDo Name</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {todo.map(todo => (
            <tr  key={todo.id}>
              <td> <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              </td>
              <td>{todo.ToDoContent}</td>
              <td>
                <button className='btn' onClick={() => handleDelete(todo.id)}><i class="fa-solid fa-trash text-danger"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className='text-info'>Completed ToDo</h2>

      <Table striped bordered hover size="sm">
        <thead>
          <tr  className='text-center'>
            <th>ToDo Name</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {todo.filter(todo => todo.completed).map(todo => (
            <tr key={todo.id}>
              <td>{todo.ToDoContent}</td>
              <td>
                <button className='btn' onClick={() => handleDelete(todo.id)}>
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
