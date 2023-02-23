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
  comment: string,
  isNest: boolean
}>) => {
  const uid = props.uid;
  const date = props.date;
  const to = props.to;
  const comment = props.comment;
  const isNest = props.isNest;

  // console.log(`to ${to}`);

  const hoge = (
    <>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {to}
          </Avatar>
        }
        title={
          isNest ?
            <Link to={`../users/${uid}`}>{to}</Link>
            : <Typography variant="body1">{to}</Typography>
        }
        subheader={date.toLocaleDateString()}
      />
        <CardContent>
          <Typography variant="body2">{comment}</Typography>
        </CardContent>
    </>
  );

  return (
    <Card>
      {isNest ? 
        <CardActionArea href={`../users/${uid}`}>
          {hoge}
        </CardActionArea> 
        : hoge}
    </Card>
  )
}

export default Post