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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
        <Tooltip title="個人の投稿">
          <IconButton
            // onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            // aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
          >
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }} src="https://mui.com/static/images/avatar/2.jpg">M</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>プロフィール</MenuItem>
                <MenuItem onClick={handleClose}>私への投稿</MenuItem>
                <MenuItem onClick={async () => {
            await signOut(auth);
            navigate('/');
          }}>サインアウト</MenuItem>
              </Menu>
            </div>
          </IconButton>
        </Tooltip>
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
          <Post date='2022-12-1' to='佐久間雄大' comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi incidunt officiis voluptates consectetur corrupti doloremque ullam delectus ipsam, corporis impedit rem ad architecto temporibus nemo nostrum alias, ex minima veritatis!' />
        </Grid>
        <Grid item xs={12}>
          <Post date='2023-01-17' to='Michel' comment='ほげ' />
        </Grid>
      </Grid>
    </>
  );
};