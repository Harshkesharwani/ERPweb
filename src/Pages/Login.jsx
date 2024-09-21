import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline, Avatar, Grid, Link, Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/erp.png';
import { url } from '../Store/Config';

const theme = createTheme();

const Login = () => {
  const [user_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = async (user_id, password) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ user_id, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('userProfile', JSON.stringify(result.result));
        if (result.result.profile_type === 'student') {
          navigate('/Student/Student-Dashboard');
        } else if (result.result.profile_type === 'teacher') {
          navigate('/Teacher/Teacher-Dashboard');
        } else {
          navigate('/Admin/Admin-Dashboard');
        }
      } else {
        throw new Error('Login not working');
      }

      // Redirect based on profile type
    } catch (error) {
      console.log('Login not working', error);
    }
  };

  const onLoginClick = async () => {
    await handleLogin(user_id, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar lg={{ m: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 40, width: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login here
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Get access to your ERP and more
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user_id}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={hidePassword ? 'password' : 'text'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {hidePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLoginClick}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
