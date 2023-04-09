import { createSlice } from '@reduxjs/toolkit';

export interface TodoEntry {
  id: number;
  text: string;
  completed: boolean;
}

interface AppState {
  IdCounter: number;
  todos: TodoEntry[];
  isModalOpen: boolean;
  text: string;
}

const initialState: AppState = {
  IdCounter: 0,
  todos: [],
  isModalOpen: false,
  text: ''
};

const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    deleteTask:(state,data) => {
      state.todos = state.todos.filter((todo) => todo.id !== data.payload);
    },
    clearAllTasks:(state) => {
      state.todos = [];
    },
    addTask: (state, data) => {
      state.IdCounter = state.IdCounter + 1;
      var entry = {text: (data.payload as string), id: state.IdCounter } as TodoEntry;
      state.todos.push(entry);
    },
    isModalOpenUpdate: (state, data) => {
        state.isModalOpen = (data.payload as boolean);
    },
    textUpdate:(state, data) => {
      state.text = data.payload as string;
    },
  },
});

export const { deleteTask, clearAllTasks, addTask, isModalOpenUpdate , textUpdate } = counterSlice.actions;
export default counterSlice.reducer;
