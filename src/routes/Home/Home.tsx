import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Grid,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import { useFirebaseApp } from 'reactfire';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import { useState } from 'react';

export default function Home() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position='absolute'
        color='default'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          投稿一覧
        </Typography>
        </Toolbar>
      </AppBar>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Post uid="1" date={new Date(2023,1,1)} to='佐久間雄大' comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi incidunt officiis voluptates consectetur corrupti doloremque ullam delectus ipsam, corporis impedit rem ad architecto temporibus nemo nostrum alias, ex minima veritatis!' />
        </Grid>
        <Grid item xs={12}>
          <Post uid="2" date={new Date(2023,1,20)} to='Michel' comment='ほげ' />
        </Grid>
      </Grid>
    </>
  );
};