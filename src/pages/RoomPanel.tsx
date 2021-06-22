import { makeStyles, Typography } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import DeleteQuestionModal from "../components/Modals/DeleteQuestion";
import NavBar from "../components/Navbar";
import Question from "../components/Question";
import QuestionsAndAnswers from "../components/QuestionsAndAnswers";
import QuestionsLabel from "../components/QuestionsLabel";
import useModal from "../hooks/useModal";

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
  roomInfo: {
    display: "flex",
    alignItems: "center",
  },
}));

// TODO: label quantidade de perguntas
// TODO: perguntas
export default function RoomPanel() {
  const classes = useStyles();
  const [deleteModal, openDeleteModal, closeDeleteModal] = useModal();

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={10} className={classes.roomInfo}>
            <Typography variant="h2">Sala React QeA</Typography>
            <QuestionsLabel title="1 pergunta" />
          </Grid>

          <Grid item xs={12} sm={10} className={classes.noQuestions}>
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

          <Grid item xs={12} sm={10}>
            <Question
              onDeleteClick={() => {
                openDeleteModal();
              }}
            />
          </Grid>

          <Grid item xs={12} sm={10}>
            <Question
              onDeleteClick={() => {
                openDeleteModal();
              }}
              selected
            />
          </Grid>

          <Grid item xs={12} sm={10}>
            <Question
              onDeleteClick={() => {
                openDeleteModal();
              }}
              done
            />
          </Grid>
        </Grid>
      </Container>

      <DeleteQuestionModal
        questionId="fehifhejfew"
        open={deleteModal}
        handleClose={closeDeleteModal}
      />
    </>
  );
}
