import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate} from "react-router-dom";
import { useForm } from "react-hook-form"; // Импорт из react-hook-form
import { useDispatch,useSelector } from 'react-redux';
import { fetchAuth ,  selectIsAuth} from '../../redux/slices/auth'; // Импорт fetchAuth


import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth) 
  const dispatch = useDispatch();

  const { register, handleSubmit,
    formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '', 
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async(values) => {
    // console.log(dispatch(fetchAuth(values)))
    const data  = await dispatch(fetchAuth(values));
    // console.log(data) 
    if(!data.payload){
      return alert("failed to log in")
    }
    if ('token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }
  };

  if(isAuth){
    return<Navigate to="/" />
  } 

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
          Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Enter your email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter your passwordь' })}
          fullWidth
        />
        <Button disable = {!isValid} type="submit" size="large" variant="contained" fullWidth>
          Sign in 
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
