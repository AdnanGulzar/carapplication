
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import {Link, useNavigate } from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useRegisterMutation } from '../../store/apis/userApi';
import React, { useEffect } from 'react';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const navigate=useNavigate()
  const [  register, {isLoading, isError, error} ] =  useRegisterMutation()
    const [email,setEmail]=React.useState("")
    const [name,setName]=React.useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const credentials = { email,name };
          const response = await register(credentials);
          console.log(response);
          // Handle successful login
        } catch (error) {
            console.log(error);
            alert(error.message)
          // Handle login error
        }
      };
      const token =localStorage.getItem("token")
      
      useEffect(()=>{
        if (token) {
          // user is not authenticated
          navigate("/")
        }
      })

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="Name"
              autoComplete="Name"
              autoFocus
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            
            />
           
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
             
              <Grid item>
                <Link to="/signin">
                  {"Already  have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}