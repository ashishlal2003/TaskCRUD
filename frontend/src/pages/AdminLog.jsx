import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Login from '../components/auth/Login';
// import Register from '../components/auth/Register';
import Admin from '../components/auth/Admin';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import classes from './Auth.module.scss';

function Auth() {
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth) {
//       navigate('/');
//     }
//   }, [auth, navigate]);

  return (
    <Layout>
      <div className={classes.form_container}>
        <Admin/>
      </div>
    </Layout>
  );
}

export default Auth;