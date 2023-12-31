import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.scss';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      navigate('/');
      toast.success('Login successful');
    } catch (err) {
      console.log(err);
      toast.error('Login failed: ' + err.message);
    }
  };
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
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
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className={classes.editBtn}>
            Create an account!
          </Link>
          <br />
          <br />
          <Link to="/admin" className={classes.editBtn}>
            Admin? Login as admin.
          </Link>
    </div>
  );
}

export default Login;