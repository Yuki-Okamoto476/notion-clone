import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrorText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }

    if (error) return;

    setLoading(true);

    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('ログイン');
      navigate('/');
    } catch (error) {
      const errors = error.data.errors;
      errors.forEach((error) => {
        if (error.param === 'username') {
          setUsernameErrorText(error.msg);
        } else if (error.param === 'password') {
          setPasswordErrorText(error.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id='username'
          label='お名前'
          margin='normal'
          name='username'
          required
          helperText={usernameErrorText}
          error={usernameErrorText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id='password'
          label='パスワード'
          margin='normal'
          name='password'
          type='password'
          required
          helperText={passwordErrorText}
          error={passwordErrorText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to='/register'>
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
