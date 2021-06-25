import { Dialog, Typography, Button, makeStyles } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import roomStore from "../../stores/room";

interface DeleteQuestionModalProps extends ModalProps {
  questionId: string;
  onDelete?(): void;
}

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

export default function DeleteQuestionModal({
  questionId,
  open,
  handleClose,
}: DeleteQuestionModalProps) {
  const classes = useStyles();

  function handleDelete() {
    roomStore.deleteQuestion(questionId);
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.root }}>
      <DeleteOutlineRoundedIcon fontSize="large" color="secondary" />
      <Typography variant="h2" gutterBottom>
        Excluir pergunta
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tem certeza que você deseja excluir esta pergunta?
      </Typography>

      <div className={classes.buttons}>
        <Button variant="contained" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Sim, excluir
        </Button>
      </div>
    </Dialog>
  );
}
