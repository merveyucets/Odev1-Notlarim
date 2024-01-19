// EditToDo.js
import { useState } from "react";
import "./app.css";


const EditToDo = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="task">
      <div>
        <input className="input" type="text" value={editedTask} onChange={handleInputChange} />
      </div>
      <div className="buttons">
        <button className="task-btn-down" onClick={handleSave}>
          SAVE
        </button>
        <button className="task-btn-up" onClick={onCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default EditToDo;
