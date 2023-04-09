import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, clearAllTasks, TodoEntry, isModalOpenUpdate, textUpdate } from './Redux/appSlice';
import Modal from './Modal/Modal';
import './App.css'

function App() {
  const selectTodos = (state: { app: { todos: TodoEntry[] } }) => state.app.todos;
  const selectText = (state: { app: { text: string } }) => state.app.text;
  const selectIsModalOpen = (state: { app: { isModalOpen:boolean } }) => state.app.isModalOpen;


  const todos = useSelector(selectTodos);
  const text = useSelector(selectText);
  const isModalOpen = useSelector(selectIsModalOpen);

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleText = (e: { target: HTMLInputElement; }) => {

    if (e.target)
    {
      var text = e.target as HTMLInputElement;
      setText(text.value);
    }
  }


   const setIsModalOpen = (open: boolean) => {
      dispatch(isModalOpenUpdate(open));
   }

   const setText = (text: string) => {
     dispatch(textUpdate(text));
   }


  const handleAdd = () => {

    const trimmedText = text.trim();


    if (trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch(addTask(text));
      // And clear out the text input
      setText('');
    }

    closeModal();
  }

  const handleClearAllTasks = () => {
    dispatch(clearAllTasks());
  }

  const handleDelete = (Id:number) => {
    dispatch(deleteTask(Id));
  }

  return (
    <div className="App">
      <div>
        <h1>Tasks list</h1>
      </div>
      <div>
        <button onClick={openModal}>Add</button>
        <button onClick={handleClearAllTasks} >Clear all tasks</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
          <input type="text" placeholder="What needs to be done?" autoFocus={true} onChange={handleText} value={text} />
          <button onClick={handleAdd}>Add</button>
      </Modal>
    <div className = 'table-container'>
      <table>
        <tbody>
        {todos.map((todo) => {
          return (
            <tr key={todo.id}>
            <td>{todo.text}</td>
            <td>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </td>
            </tr> );
        })
      }
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;