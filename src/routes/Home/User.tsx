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
  const docRef = doc(firestore, "teacher", uid as string);

  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
  const [user, setUser] = useState("");

  const [school, setSchool] = useState("FSG高等部")
  const [workYr, setWorkYr] = useState(10);
  const [subject, setSubject] = useState("国語")

  const navigate = useNavigate();

  async function fetchReviews() {
    const docSnap = await getDoc(docRef);
    setUser(await docSnap.get("name"));

    setSchool(await (await getDoc(docSnap.get("schoolRef"))).get("schoole_name"))
    setWorkYr(await docSnap.get("workYr"))
    setSubject(await docSnap.get("subject"))

    
    const q = query(collection(firestore, "reviews"), 
      where("teacherRef", "==", docRef),
      orderBy("posted", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setReviews((prevState) => [...prevState, doc]);
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
        <Profile 
          name={user}
          school={school}
          subject={subject}
          workYr={workYr} />
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