import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    user: '',
  });
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/users/all');
      setUserList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.title.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: newTask.status,
        user: newTask.user,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        user: '',
      });
      setTaskList([data, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            placeholder="Task name"
          />
          <input
            type="text"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            placeholder="Due date"
          />
          <select
            value={newTask.user}
            onChange={(e) =>
              setNewTask({ ...newTask, user: e.target.value })
            }
          >
            <option value="">Select User</option>
            {userList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
              
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      )}
      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                assignedUser={
                  userList.find((user) => user._id === task.user)?.username
                }
              />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </div>
  );
}

export default TaskList;
