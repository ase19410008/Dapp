import {Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography} from '@mui/material';

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

  return (
    <Card 
    sx={{ maxWidth: 690 }}
    >
    <CardMedia
    component="img"
    height="194"
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