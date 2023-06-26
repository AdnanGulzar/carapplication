
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
import React, { useEffect } from 'react';
import { useLoginMutation } from '../../store/apis/userApi';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
 
export default function SignIn() {
  const navigate=useNavigate()
    const [  login, {isLoading, isError, error} ] =  useLoginMutation()
    const [email,setEmail]=React.useState("")
    const [pass,setPass]=React.useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const credentials = { email,password: pass };
          const response = await login(credentials);
          console.log(response);
          if(response?.data?.success){
            localStorage.setItem("token",response?.data?.token);
            navigate("/")

          }
          
        } catch (error) {
            console.log(error);
            alert(error?.data?.message)

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
  return (<>
  {isLoading&& <h1>Loading</h1>}
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
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
             <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e)=>{setPass(e.target.value)}}
            />
           
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
    </>
  );
}