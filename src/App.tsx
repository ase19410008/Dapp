import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { useFirestore, } from 'reactfire';
import { collection, DocumentData, DocumentSnapshot, getDoc, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import Post from './components/Post';

/*
rev-cpコレクションの取得
ループでドキュメントを取り出す
teacherRefで教師ドキュメントを取得
*/
export default function App() {
  const firestore = useFirestore();
  const [teachers, setTeachers] = useState<Array<DocumentSnapshot<DocumentData>>>([]);
  const [reviews, setReviews] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);

  async function fetchTeachers() {
    // rev-cpコレクションの参照を引数に全ドキュメントを取得
    const querySnapshot = await getDocs(collection(firestore, 'rev-cp'));
    querySnapshot.forEach(async (doc) => {
      setReviews((prevState) => [...prevState, doc]);
      
      const teacher = await getDoc(doc.get("teacherRef")) as DocumentSnapshot<DocumentData> ;
      setTeachers((prevState) => [...prevState, teacher]);
      // console.log(teacher);
      // console.log(teacher.data());
      // console.log(teacher.get("name"));
    })
  }

  useEffect(() => {
    fetchTeachers();    
  }, [])
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {reviews?.map((review, i) => (
          <Post key={review?.id}
            uid={teachers[i]?.id}
            date={review?.get("posted").toDate()}
            to={teachers[i]?.get("name")}
            comment={review?.get("comment")}
            isNest={false} />
        ))}
      </Box>
    </Container>
  );
}