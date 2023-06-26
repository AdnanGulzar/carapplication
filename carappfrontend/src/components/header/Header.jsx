
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useLogoutMutation } from '../../store/apis/userApi';



function ResponsiveAppBar() {
  const navigate=useNavigate()
  const [  loginOut, {isLoading, isError, error} ] =  useLogoutMutation()
  const handleLogout=async()=>{
    try {
     
      const response = await loginOut();
      console.log(response);
      if(response.data.success){
        localStorage.removeItem("token")
        navigate("/signin")

        
        alert("logout successfull")
      }
      
    } catch (error) {
        console.log(error);
        alert(error?.data?.message)
      // Handle login error
    }
  };

  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Car
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
             
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
             
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
             
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
                <MenuItem  >
                  <Typography textAlign="center">Cars</Typography>
                </MenuItem>
                <MenuItem  >
                  <Typography textAlign="center">Category</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Car
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
          <MenuItem  >
          <Link to="/car">
                  <Typography textAlign="center">Cars</Typography>
                  </Link>
                </MenuItem>
                <MenuItem  >
                <Link to="/category">
                  <Typography textAlign="center">Category</Typography>
                  </Link>
                </MenuItem>
            
        
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <MenuItem  >
          <Button sx={{color:"white"}} onClick={handleLogout}>
                  Logout
                  </Button>
                </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;