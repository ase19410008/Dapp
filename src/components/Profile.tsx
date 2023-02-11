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

const Profile = () => {
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
    alt="Paella dish"
    />
    <CardHeader
    title="高等学校"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        担当教科　現国
        勤続年数　10年
      </Typography>
    </CardContent>
  </Card>
  )
}

export default Profile