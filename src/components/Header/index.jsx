import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Do you really want to get out?")) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">create a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                Go out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">To come in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
