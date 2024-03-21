import { createSlice } from '@reduxjs/toolkit';


const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      console.log(action.payload);
      localStorage.setItem('todo', JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      const newState = state.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todo', JSON.stringify(newState)); 
      return newState;
    },
    completedTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todo', JSON.stringify(state)); 
      }
    }
  }
});

export const { addTodo, deleteTodo, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;

