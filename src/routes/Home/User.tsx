import { useEffect, useState } from 'react';
import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom'
import { useFirestore } from 'reactfire';
import Post from '../../components/Post';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';

const User = () => {
  const firestore = useFirestore();
  let { uid } = useParams();
  const docRef = doc(firestore, "teachers", uid as string);

  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
  const [user, setUser] = useState("");

  async function fetchReviews() {
    setUser(await (await getDoc(docRef)).get("name"));

    const q = query(collection(firestore, "rev-cp"), 
      where("teacherRef", "==", docRef),
      orderBy("posted", "desc"));
    console.log(q);

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      setReviews((prevState) => [...prevState, doc]);
      console.log(doc.id, " => ", doc.data());
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
      <Grid container rowSpacing={3}>
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