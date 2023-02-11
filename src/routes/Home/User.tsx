import { useEffect, useState } from 'react';
import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom'
import { useFirestore } from 'reactfire';
import Post from '../../components/Post';
import Profile from '../../components/Profile';
import { AppBar, Grid, Toolbar, Typography,
Card,
Box,
Avatar,
Divider,
Stack,} from '@mui/material';

const User = () => {
  const firestore = useFirestore();
  let { uid } = useParams();
  const docRef = doc(firestore, "teachers", uid as string);

  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
  const [user, setUser] = useState("");

  const [school, setschool] = useState("FSG高等部")
  const [year, setYear] = useState(10);
  const [subject, setsubject] = useState("国語")

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
      {/* <Card>
        <Box sx={{ p: 2, display: 'flex' }}>
          <Avatar variant="rounded" src="https://mui.com/static/images/avatar/1.jpg" />
          <Stack spacing={0.5}>
            <Typography fontWeight={700}>{user}</Typography>
            <Typography variant="body2" color="text.secondary">{school}</Typography>
          </Stack>
        </Box>
        <Divider />
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            justifyContent="center"
            spacing={8}
            // sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
          >
            <Typography fontWeight={300}>勤続年数 {year}</Typography>
            <Typography fontWeight={300}>担当教科 {subject}</Typography>
          </Stack>
      </Card> */}
      <Grid container rowSpacing={3}
        justifyContent="center"
        alignItems="center">
        <Profile />
        {reviews?.map((review, i) => (
          <Grid item xs={12}>
            <Post key={review?.id + `No{i}`}
              uid={review?.id}
              date={review?.get("posted").toDate()}
              to={review?.get("name")}
              comment={review?.get("comment")} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default User