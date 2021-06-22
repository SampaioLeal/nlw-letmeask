import { Dialog, Typography, Button } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

interface DeleteQuestionModalProps extends ModalProps {
  questionId: string;
  onDelete?(): void;
}

export default function DeleteQuestionModal({
  questionId,
  open,
  handleClose,
  onDelete,
}: DeleteQuestionModalProps) {
  function handleDelete() {
    handleClose();
    onDelete && onDelete();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DeleteOutlineRoundedIcon fontSize="large" color="secondary" />
      <Typography variant="h2">Excluir pergunta</Typography>
      <Typography variant="subtitle1">
        Tem certeza que você deseja excluir esta pergunta?
      </Typography>

      <div>
        <Button variant="contained">Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Sim, excluir
        </Button>
      </div>
    </Dialog>
  );
}
