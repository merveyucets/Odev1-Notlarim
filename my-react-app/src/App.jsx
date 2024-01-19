import { useEffect, useState } from "react";
import "./app.css";
import EditToDo from "./editToDo";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
  });

  const [value, setInputValue] = useState("");
  

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      setTasks([value, ...tasks]);
      setInputValue("");
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //console.log("Tasks updated, storing in localStorage:", tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleDelete = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  const handleCheck = (task, index) => {
    console.log(task, index);
    setCompletedTasks([task, ...completedTasks]);
    handleDelete(index);
  };

  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = (editedTask, index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editedTask : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1>TO DO LIST</h1>
        <div className="row">
          <input
            type="text"
            placeholder="write your task here"
            onChange={handleValueChange}
            value={value}
          />
          <button type="submit" onClick={handleSubmit}>
            ADD
          </button>

        </div>
        <div>
          <div className="column">
            <h2>TO DO</h2>
            <ul>
              <li>
                {tasks.map((task, index) => (
                   editingIndex === index ? (
                    <EditToDo
                      key={index}
                      task={task}
                      onSave={(editedTask) => handleSaveEdit(editedTask, index)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                  <div key={index} className="task">
                    <div className="input">
                      <input
                        type="checkbox"
                        id={index}
                        value={task}
                        checked={false}
                        onChange={() => handleCheck(task, index)}
                      />
                      <label htmlFor={index}>{task}</label>
                    </div>
                    <div className="buttons">
                      <div>
                        <button
                          className="task-btn-up"
                          type="submit"
                          onClick={() => handleDelete(index)}
                        >
                          DEL
                        </button>
                      </div>
                      <div>
                        <button
                          className="task-btn-down"
                          type="submit"
                          onClick={() => handleEdit(index)}
                        >
                          EDIT
                        </button>
                      </div>
                    </div>

                    <br />
                  </div>))
                  
                )}
              </li>
            </ul>
          </div>
          <h2>DONE</h2>
          <div className="row">
            <div>
              <ul>
                {completedTasks.map((task, index) => (
                  <div key={index}>
                    <label style={{ textDecoration: "line-through" }}>
                      {task}
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
