import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">To-Do List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new Todo"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={addTodo}
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Todo
      </button>

      <ul className="mt-4 mt-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 border-b ${
              todo.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className={`${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-yellow-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => toggleComplete(index)}
                className={`px-3 py-1 text-xs rounded-full ${
                  todo.completed ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}
              >
                {todo.completed ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editIndex !== null && (
        <div className="mt-4">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={saveEdit}
            className="w-full py-2 bg-blue-500 text-white rounded-lg mt-2"
          >
            Save Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
