import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth'; // Импорт fetchAuth
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Импорт useForm

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth); 
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '', 
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async(values) => {
    const data = await dispatch(fetchRegister(values));
    // console.log(data) 
    if (!data.payload) {
      return alert("Failed to login");
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  } 

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account creation
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Please provide full name' })}
          className={styles.field} 
          label="full name"
          fullWidth 
        />
        <TextField 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter your email' })}
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
        />
        <TextField 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Enter your password' })}
          className={styles.field} 
          label="password" 
          fullWidth 
        />
        <Button disable = {!isValid} type="submit" size="large" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
