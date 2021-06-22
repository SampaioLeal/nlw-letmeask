import { Grid, Box, Button } from "@material-ui/core";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import Divider from "../components/Divider";
import GoogleIcon from "../components/GoogleIcon";
import Logo from "../components/Logo";
import RoomInput from "../components/RoomInput";
import useHomeStyles from "../styles/home";
import authStore from "../stores/auth";
import Presentation from "../components/Presentation";

export default function Anonymous() {
  const classes = useHomeStyles();

  return (
    <Grid container spacing={0} className={classes.root}>
      <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
        <Grid item xs={12} md={6} className={classes.presentation}>
          <Presentation />
        </Grid>
      </Box>

      <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={12} item md={6} className={classes.joinRoom}>
          <Logo verticalMargin />

          <Button
            onClick={authStore.signInWithGoogle}
            variant="outlined"
            fullWidth
          >
            <GoogleIcon />
            Entrar com o Google
          </Button>

          <Divider title="ou entre em uma sala" />

          <RoomInput placeholder="Digite o código da sala" />

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
          >
            <QuestionAnswerRoundedIcon />
            Entrar na sala
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
