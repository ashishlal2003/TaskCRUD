import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.status || false);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedUser, setAssignedUser] = useState(null);

  // const fetchAssignedUser = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/users/${task.user}`);
  //     setAssignedUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAssignedUser();
  // }, []);

  const handleCheckboxChange = async (e) => {
    try {
      setIsLoading(true);
      const checked = e.target.checked;
      await axios.put(`/api/tasks/${task._id}`, {
        status: checked,
      });
      setIsCompleted(checked);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox}>
          <input
            type="checkbox"
            checked={isCompleted}
            disabled={isLoading}
            onChange={handleCheckboxChange}
          />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{task.description}</td>
      <td>{ '-'}</td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(task.dueDate).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
