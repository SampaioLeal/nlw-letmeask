import { makeStyles, Typography } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../components/Navbar";
import QuestionsAndAnswers from "../components/QuestionsAndAnswers";

const useStyles = makeStyles((theme) => ({
  noQuestions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  noQuestionsTitle: {
    margin: theme.spacing(1),
  },
  noQuestionsDescription: {
    color: theme.palette.grey[600],
  },
}));

// TODO: label quantidade de perguntas
// TODO: perguntas
export default function RoomPanel() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <Typography variant="h2">Sala React QeA</Typography>
          </Grid>

          <Grid item xs={10} className={classes.noQuestions}>
            <QuestionsAndAnswers />
            <Typography variant="h4" className={classes.noQuestionsTitle}>
              Nenhuma pergunta por aqui...
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.noQuestionsDescription}
            >
              Envie o código desta sala para seu público e comece a responder
              perguntas!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
