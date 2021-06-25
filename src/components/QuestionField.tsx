import {
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import authStore from "../stores/auth";
import Spacer from "./Spacer";

interface QuestionFieldProps {
  sendQuestion(text: string): void;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  username: {
    margin: 8,
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  roomInfo: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
  },
}));

export default function QuestionField({ sendQuestion }: QuestionFieldProps) {
  const classes = useStyles();
  const [question, setQuestion] = useState("");

  function handleChangeQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  return (
    <>
      <Grid item xs={12} sm={10}>
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
      <Grid item xs={12} sm={10} className={classes.roomInfo}>
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
          onClick={() => {
            sendQuestion(question.trim());
            setQuestion("");
          }}
        >
          Enviar pergunta
        </Button>
      </Grid>
    </>
  );
}
