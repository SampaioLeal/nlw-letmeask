import { makeStyles, Typography, Container, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Question from "../components/Question";
import QuestionField from "../components/QuestionField";
import QuestionsAndAnswers from "../components/QuestionsAndAnswers";
import QuestionsLabel from "../components/QuestionsLabel";
import roomStore from "../stores/room";
import authStore from "../stores/auth";

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

function Room() {
  const classes = useStyles();
  const params = useParams<{ code: string }>();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const isAdmin = roomStore.room
    ? authStore.user?.uid === roomStore.room?.adminUid
    : true;

  function handleSendQuestion(text: string) {
    if (text && authStore.user) {
      roomStore.addQuestion(text, authStore.user);
    }
  }

  useEffect(() => {
    if (!params.code) history.push("/");

    let unsubscribeRoom: () => void;
    let unsubscribeQuestions: () => void;

    async function sync() {
      try {
        const roomData = await roomStore.checkRoom(params.code);
        unsubscribeRoom = roomStore.listenRoom(roomData.id);
        unsubscribeQuestions = roomStore.listenQuestions(roomData.id);
      } catch (e) {
        history.push("/");
      }
    }

    sync();

    return () => {
      unsubscribeRoom && unsubscribeRoom();
      unsubscribeQuestions && unsubscribeQuestions();
    };
  }, []);

  useEffect(() => {
    if (roomStore.room) {
      setActive(true);
    }
  }, [roomStore.room]);

  useEffect(() => {
    if (active && !roomStore.room) {
      history.push("/");
    }
  }, [active, roomStore.room]);

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={10} className={classes.roomInfo}>
            <Typography variant="h2">Sala {roomStore.room?.name}</Typography>
            <QuestionsLabel length={roomStore.questions.length} />
          </Grid>

          {!isAdmin && <QuestionField sendQuestion={handleSendQuestion} />}

          {roomStore.questions.length ? (
            roomStore.questions.map((question) => {
              return (
                <Grid key={question.id} item xs={12} sm={10}>
                  <Question question={question} />
                </Grid>
              );
            })
          ) : (
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
          )}
        </Grid>
      </Container>
    </>
  );
}

export default observer(Room);
