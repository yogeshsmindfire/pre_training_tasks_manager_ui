import { useDispatch } from 'react-redux';
import { Link } from '@fluentui/react-components';

import {
  fetchUser,
  login,
  userFetchEnd,
} from '../../global/features/userSlice';
import { loginUser, registerUser } from '../../services/authService';

import './Auth.css';
import Form from '../../components/Form/Form';
import { loginFormConfig, registrationFormConfig } from './Auth.config';
import type { FieldConfig } from '../../components/Form/Form.types';
import { useState } from 'react';

const Auth = ({
  fetchTasks,
  toggleLogin,
  showLogin,
}: {
  fetchTasks: () => void;
  toggleLogin: () => void;
  showLogin: boolean;
}) => {
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (event: any) => {
    const { name, email, password, remember } = event;
    try {
      setAuthError('');
      const rememberUser = remember && remember.value === 'on' ? true : false;
      dispatch(fetchUser());
      const { status, data } = await registerUser(
        name.value,
        email.value,
        password.value,
        rememberUser
      );
      if (status === 200) {
        dispatch(login(data.user));
        fetchTasks();
      } else {
        setAuthError(data.message);
        dispatch(userFetchEnd());
      }
    } catch (error) {
      console.error(error);
      dispatch(userFetchEnd());
      setAuthError('Failed to Register. Please try again.');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (event: any) => {
    try {
      setAuthError('');
      dispatch(fetchUser());
      const { email, password, remember } = event;
      const rememberMe = remember && remember.value === 'on' ? true : false;
      const { status, data } = await loginUser(
        email.value,
        password.value,
        rememberMe
      );
      if (status === 200) {
        dispatch(login(data.user));
        fetchTasks();
      } else {
        dispatch(userFetchEnd());
        setAuthError(data.message);
      }
    } catch (err) {
      console.error(err);
      dispatch(userFetchEnd());
      setAuthError('Failed to Login. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>{showLogin ? 'Login' : 'Register'}</h2>
        <Form
          key={showLogin ? 'login' : 'register'}
          authError={authError}
          formConfig={
            showLogin
              ? (loginFormConfig as FieldConfig[])
              : (registrationFormConfig as FieldConfig[])
          }
          handleSubmit={showLogin ? handleLogin : handleRegister}
        />
        <Link onClick={() => toggleLogin()}>
          {showLogin
            ? 'New User? Create Account'
            : 'Already have an account? Login'}
        </Link>
      </div>
    </div>
  );
};

export default Auth;
