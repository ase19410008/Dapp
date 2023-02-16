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
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../../components/Post';
import { useEffect, useState } from 'react';
import { collection, DocumentData, DocumentSnapshot, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

export default function Home() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const { param } = useParams();
  const isNest = param === undefined;

  const settings = ['プロフィール', 'アカウント', 'ダッシュボード', 'サインアウト'];

  const firestore = useFirestore();
  const [teachers, setTeachers] = useState<Array<DocumentSnapshot<DocumentData>>>([]);
  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);

  async function fetchTeachers() {
    // rev-cpコレクションの参照を引数に全ドキュメントを取得
    const querySnapshot = await getDocs(query(collection(firestore, 'rev-cp'), orderBy("posted", "desc")));
    querySnapshot.forEach(async (doc) => {
      setReviews((prevState) => [...prevState, doc]);
      
      console.log(doc.id);
      
      const teacher = await getDoc(doc.get("teacherRef")) as DocumentSnapshot<DocumentData> ;
      setTeachers((prevState) => [...prevState, teacher]);
      // console.log(teacher);
      // console.log(teacher.data());
      // console.log(teacher.get("name"));
    })
  }

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  useEffect(() => {
    fetchTeachers();    
  }, [])

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
            <Tooltip title="設定を開く">
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
        {reviews?.map((review, i) => (
          <Grid item xs={12}>
            <Post key={review?.id + `No{i}`}
              uid={teachers[i]?.id}
              date={review?.get("posted").toDate()}
              to={teachers[i]?.get("name")}
              comment={review?.get("comment")}
              isNest={isNest} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};