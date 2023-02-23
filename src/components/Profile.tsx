import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Profile = (props: React.PropsWithChildren<{
  name: string
  school: string,
  subject: string,
  workYr: number,
}>) => {
  const name = props.name
  const school = props.school
  const subject = props.subject
  const workYr = props.workYr;
  
  // console.log("prf");
  // console.log(school);
  // console.log(subject);
  // console.log(workYr);

  return (
    <Card 
    // sx={{ maxWidth: 345 }}
    sx={{ maxWidth: 690 }}
    >
    <CardMedia
    component="img"
    height="194"
    // height="345"
    image="https://mui.com/static/images/avatar/1.jpg"
    alt={name}
    />
    <CardHeader
    title={school}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        担当教科 {subject}<br/>
        勤続年数 {workYr}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default Profile