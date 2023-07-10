import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import classes from './AuthForm.module.scss';

function Register() {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await axios.post('/api/auth/register', user);
      toast.success('Registered successfully. Kindly login to continue');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="username">
          Full Name:
          <input name="username" type="text" placeholder="Full Name" required />
        </label>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
        </label>
        <br />
        <label htmlFor="password">
        password:
          <input
            name="password"
            type="password"
            placeholder="password"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,}$"
            title="Password must be alphanumeric and at least 6 characters long"
            required
          />

        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className={classes.editBtn}>
            Already have an account? Login
          </Link>
          <br />
          <br />
          <Link to="/admin" className={classes.editBtn}>
            Admin? Login as admin.
          </Link>
    </div>
  );
}

export default Register;