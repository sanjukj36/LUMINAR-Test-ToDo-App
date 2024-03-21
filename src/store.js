import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice';

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
