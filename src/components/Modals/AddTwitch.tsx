import {
  Dialog,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import roomStore from "../../stores/room";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function AddTwitchModal({ open, handleClose }: ModalProps) {
  const [channel, setChannel] = useState(roomStore.room?.twitch || "");
  const classes = useStyles();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChannel(event.target.value);
  }

  function handleAddTwitch() {
    if (roomStore.room) {
      roomStore.addTwitch(channel, roomStore.room?.id);
      handleClose();
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.root }}>
      <Typography variant="h2" gutterBottom>
        Adicionar Twitch
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Adicione seu canal da twitch e receba as perguntas que contenham a
        hashtag #letmeask
      </Typography>

      <TextField
        className={classes.input}
        fullWidth
        placeholder="Digite seu canal da twitch"
        variant="outlined"
        color="primary"
        value={channel}
        onChange={handleChange}
      />

      <div className={classes.buttons}>
        <Button variant="contained" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddTwitch}>
          Adicionar
        </Button>
      </div>
    </Dialog>
  );
}
