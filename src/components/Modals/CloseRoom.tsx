import { Dialog, Typography, Button, makeStyles } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import appStore from "../../stores/app";

const useStyles = makeStyles({
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
});

export default function CloseRoomModal({ open, handleClose }: ModalProps) {
  const classes = useStyles();

  function handleCloseRoom() {
    appStore.closeRoom();
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.root }}>
      <DeleteOutlineRoundedIcon fontSize="large" color="secondary" />
      <Typography variant="h2" gutterBottom>
        Encerrar sala
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tem certeza que você deseja encerrar esta sala?
      </Typography>

      <div className={classes.buttons}>
        <Button variant="contained">Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={handleCloseRoom}>
          Sim, encerrar
        </Button>
      </div>
    </Dialog>
  );
}
