import { useParams } from 'react-router-dom'

const User = () => {
  let { uid } = useParams();

  // console.log(uid);

  return (
    <div>User {uid}</div>
  );
}

export default User