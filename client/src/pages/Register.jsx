import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Register = () => {
  const navigate = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmErrorText, setConfirmErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');
    setConfirmErrorText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrorText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmErrorText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrorText('パスワードと確認用パスワードが異なります');
    }

    if (error) return;

    setLoading(true);

    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('新規登録');
      navigate('/');
    } catch (error) {
      const errors = error.data.errors;
      errors.forEach((error) => {
        if (error.param === 'username') {
          setUsernameErrorText(error.msg);
        } else if (error.param === 'password') {
          setPasswordErrorText(error.msg);
        } else if (error.param === 'confirmPassword') {
          setConfirmErrorText(error.msg);
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
        <TextField
          fullWidth
          id='confirmPassword'
          label='確認用パスワード'
          margin='normal'
          name='confirmPassword'
          type='password'
          required
          helperText={confirmErrorText}
          error={confirmErrorText !== ''}
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to='/login'>
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
