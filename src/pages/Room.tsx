import {
  makeStyles,
  Typography,
  Container,
  Grid,
  TextField,
  Avatar,
  Button,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Question from "../components/Question";
import QuestionsAndAnswers from "../components/QuestionsAndAnswers";
import QuestionsLabel from "../components/QuestionsLabel";
import Spacer from "../components/Spacer";
import appStore from "../stores/app";
import authStore from "../stores/auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  username: {
    margin: 8,
    color: "#737380",
  },
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
  input: {
    borderRadius: theme.shape.borderRadius,
    background: "#fff",
  },
}));

function Room() {
  const classes = useStyles();
  const params = useParams<{ code: string }>();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [question, setQuestion] = useState("");

  function handleSendQuestion() {
    const text = question.trim();
    if (text && authStore.user) {
      setQuestion("");
      appStore.addQuestion(text, authStore.user);
    }
  }

  function handleChangeQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  useEffect(() => {
    if (!params.code) history.push("/");

    let unsubscribeRoom: () => void;
    let unsubscribeQuestions: () => void;

    async function sync() {
      try {
        const roomData = await appStore.checkRoom(params.code);
        unsubscribeRoom = appStore.listenRoom(roomData.id);
        unsubscribeQuestions = appStore.listenQuestions(roomData.id);
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
    if (appStore.room) {
      setActive(true);
    }
  }, [appStore.room]);

  useEffect(() => {
    if (active && !appStore.room) {
      history.push("/");
    }
  }, [active, appStore.room]);

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={10} className={classes.roomInfo}>
            <Typography variant="h2">Sala {appStore.room?.name}</Typography>
            <QuestionsLabel length={appStore.questions.length} />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              value={question}
              onChange={handleChangeQuestion}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12} md={10} className={classes.roomInfo}>
            {authStore.user && (
              <>
                <Avatar
                  className={classes.avatar}
                  alt={authStore.user.displayName || "Foto de perfil"}
                  src={authStore.user.photoURL || undefined}
                />
                <Typography className={classes.username}>
                  {authStore.user?.displayName}
                </Typography>
              </>
            )}
            <Spacer />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendQuestion}
            >
              Enviar pergunta
            </Button>
          </Grid>

          {appStore.questions.length ? (
            appStore.questions.map((question) => {
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
