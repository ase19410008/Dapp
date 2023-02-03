import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Avatar
} from "@mui/material";
import { Link } from "react-router-dom";

const Post = (props: React.PropsWithChildren<{
  uid: string,
  date: Date,
  to: string,
  comment: string
}>) => {
  const uid = props.uid;
  const date = props.date;
  const to = props.to;
  const comment = props.comment;  

  return (
    <Card>
        <CardActionArea>
          <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              {/* {to.charAt(0)} */}
            </Avatar>
          }
          title={
            // <Link to={`./users/${uid}`} relative="path">{to}</Link>
            <Link to={`../users/${uid}`}>{to}</Link>
          }
          subheader={date.toLocaleDateString()}
        />
          <CardContent>
          {/* <Divider />
          <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum sunt harum debitis aperiam nisi velit culpa fugiat cumque deleniti assumenda, beatae nesciunt aut nostrum sint nihil quas pariatur optio placeat.</Typography> */}
          {/* <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus illo dicta necessitatibus veniam itaque nihil ipsum, quisquam voluptas alias? Ullam, temporibus modi non tempore qui reprehenderit natus itaque quo nostrum!</Typography>
  </Stack> */}
  <Typography variant="body2">{comment}</Typography>
          </CardContent>
        </CardActionArea>
</Card>
  )
}

export default Post