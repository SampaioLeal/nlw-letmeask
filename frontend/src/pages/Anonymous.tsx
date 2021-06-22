import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Divider from "../components/Divider";
import GoogleIcon from "../components/GoogleIcon";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import Logo from "../components/Logo";
import RoomInput from "../components/RoomInput";
import useHomeStyles from "../styles/home";

export default function Anonymous() {
  const classes = useHomeStyles();

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} md={6} className={classes.presentation}>
        <img src="/images/presentation.png" alt="Presentation" />
        <Typography variant="h1" className={classes.title}>
          Toda pergunta tem uma resposta.
        </Typography>
        <Typography variant="h3" className={classes.description}>
          Aprenda e compartilhe conhecimento com outras pessoas.
        </Typography>
      </Grid>
      <Grid xs={12} item md={6} className={classes.joinRoom}>
        <Logo verticalMargin />

        <Button variant="outlined" fullWidth>
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
    </Grid>
  );
}
