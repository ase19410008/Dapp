import { Stack, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import Enroll from './Enroll'
import Club from './Club'
import MainFeaturedPost from './MainFeaturedPost'

import { useNavigate } from 'react-router-dom';

const mainFeaturedPost = {
  image: 'https://seiryojoho-h.fcs.ed.jp/wysiwyg/image/download/1/1/',
  imageText: 'main image description',
};

const School = () => {
  const theme = useTheme()
  const navigate = useNavigate();

  return (
    <>
      <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("../dashboard")}>
            ダッシュボードに戻る
          </Button>
      <MainFeaturedPost post={mainFeaturedPost} />
      <div>
          <Stack direction="row" spacing={2}>
            <Typography>学校名</Typography>
            <Typography>福島県立清陵情報高等学校</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>創立年</Typography>
            <Typography>1980</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>住所</Typography>
            <Typography>福島県郡山市</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>最寄駅</Typography>
            <Typography>郡山</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>電話番号</Typography>
            <Typography>0248720180</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>メールアドレス</Typography>
            <Typography>info-@gmail.com</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>URL</Typography>
            <Typography>wiz.ac.jp</Typography>
          </Stack>
          <Typography>在校生徒(2022年)</Typography>
          <Enroll/>
          <Club />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => navigate("./edit")}>
            編集
          </Button>
        </div>
    </>
  )
}

export default School