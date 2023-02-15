import { useEffect, useState } from 'react';
import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom'
import { useFirestore } from 'reactfire';
import Post from '../../components/Post';
import Profile from '../../components/Profile';
import { AppBar, Grid, Toolbar, Typography, IconButton, Tooltip} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const User = () => {
  const firestore = useFirestore();
  let { uid } = useParams();
  const isNest = uid === undefined;
  const docRef = doc(firestore, "teachers", uid as string);

  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
  const [user, setUser] = useState("");

  const [school, setschool] = useState("FSG高等部")
  const [year, setYear] = useState(10);
  const [subject, setsubject] = useState("国語")

  const navigate = useNavigate();

  async function fetchReviews() {
    setUser(await (await getDoc(docRef)).get("name"));

    const q = query(collection(firestore, "rev-cp"), 
      where("teacherRef", "==", docRef),
      orderBy("posted", "desc"));
    // console.log(q);

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      setReviews((prevState) => [...prevState, doc]);
      // console.log(doc.id, " => ", doc.data());
      console.log(doc.data());
      
    });
  }

  useEffect(() => {
    fetchReviews();
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
        <Tooltip title="タイムラインに戻る">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/home')}
          >
            <ChevronLeftIcon />
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
          {user}さんへの投稿
        </Typography>
        </Toolbar>
      </AppBar>
      <Grid container rowSpacing={3}
        justifyContent="center"
        alignItems="center">
        <Profile />
        {reviews?.map((review, i) => (
          <Grid item xs={12}>
            <Post key={review?.id + `No{i}`}
              uid={review?.id}
              date={review?.get("posted").toDate()}
              to={review?.get("from")}
              comment={review?.get("comment")}
              isNest={isNest} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default User