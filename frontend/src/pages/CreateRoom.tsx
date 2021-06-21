import { darken } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid, makeStyles } from "@material-ui/core";
import Logo from "../components/Logo";
import RoomInput from "../components/RoomInput";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  presentation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.main,
    padding: theme.spacing(6),
  },
  title: {
    color: theme.palette.primary.contrastText,
    margin: "16px 0",
  },
  description: {
    color: darken(theme.palette.primary.contrastText, 0.2),
  },
  joinRoom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    padding: theme.spacing(6),
  },
  input: {
    margin: "16px 0",
  },
}));

export default function CreateRoom() {
  const classes = useStyles();

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

        <Typography variant="h2">Crie uma nova sala</Typography>

        <RoomInput className={classes.input} placeholder="Nome da sala" />

        <Button variant="contained" color="primary" fullWidth>
          Criar sala
        </Button>
      </Grid>
    </Grid>
  );
}
