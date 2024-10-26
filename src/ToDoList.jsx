import React, {useState} from 'react'

function ToDoList(){

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event){
    setNewTask(event.target.value);
}

function addTask(){
    if(newTask.trim() !== ""){
        setTasks(t => [...t, {text: newTask, completed: false}]);
        setNewTask("");
    }
}

function deleteTask(index){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
}

function moveTaskUp(index){

    if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index - 1]] = 
        [updatedTasks[index - 1], updatedTasks[index]];
        setTasks(updatedTasks);
    }
}
function toggleComplete(index){
  const updatedTasks = tasks.map((task,i) => i === index ? 
                                    {...task, completed: !task.completed} : task);
  setTasks(updatedTasks)
}
  return(
  <div className='to-do-list-container'>
    <div className="to-do-list">
      
      <h1>To-Do-List</h1>
      <br/>
      <div className='input-container'>

        <input 
            type='text'
            placeholder='Enter the tasks'
            value={newTask}
            onChange={handleInputChange}/>
        
        <button 
            className='add-button' 
            onClick={addTask}> 
            Add
        </button>
      </div>
      
      <ol>
        {tasks.map((task, index) =>(
          <li key ={index}>
              <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() =>toggleComplete(index)}>
              </input>
              <span className={`text ${task.completed ? 'completed' : '' } `}>{task.text}</span>

              <button
                  className='delete-button'
                  onClick={() =>deleteTask(index)}>
                    Delete
              </button>

              <button
                  className='up-button'
                  onClick={() =>moveTaskUp(index)}>
                    &#x2191;
              </button>
          </li>
        ))}
      </ol>
    </div>
  </div>
  );
  
}

export default ToDoList