import { lighten, makeStyles, Typography } from "@material-ui/core";
import { Paper, Grid, Avatar } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteQuestionModal from "./Modals/DeleteQuestion";
import Spacer from "./Spacer";
import authStore from "../stores/auth";
import useModal from "../hooks/useModal";
import roomStore from "../stores/room";

interface QuestionProps {
  question: Question;
}

const useStyles = makeStyles((theme) => ({
  root: (props: QuestionProps) => ({
    padding: theme.spacing(3),
    boxShadow: props.question.selected
      ? "0px 2px 12px rgba(0, 0, 0, 0.12)"
      : undefined,
    borderStyle: props.question.selected ? "solid" : undefined,
    borderWidth: props.question.selected ? 1 : undefined,
    borderColor: props.question.selected
      ? theme.palette.primary.main
      : undefined,
    background: props.question.solved
      ? lighten("#000000", 0.8)
      : props.question.selected
      ? lighten(theme.palette.primary.main, 0.9)
      : undefined,
  }),
  info: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    margin: "0 4px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  },
  deleteIcon: {
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.main,
    },
  },
  username: {
    margin: 8,
    color: "#737380",
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Question(props: QuestionProps) {
  const classes = useStyles(props);
  const [deleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const isAdmin = roomStore.room?.adminUid === authStore.user?.uid;
  const isLiked = authStore.user
    ? props.question.likes.includes(authStore.user.uid)
    : false;

  function handleSolve() {
    roomStore.updateQuestion(props.question.id, {
      solved: !props.question.solved,
    });
  }

  function handleSelect() {
    roomStore.updateQuestion(props.question.id, {
      selected: !props.question.selected,
    });
  }

  function handleLike() {
    if (!authStore.user) return;
    const userId = authStore.user.uid;
    const isLike = !props.question.likes.includes(userId);

    roomStore.toggleLikeOfQuestion(props.question.id, userId, isLike);
  }

  function handleDelete() {
    openDeleteModal();
  }

  return (
    <>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{props.question.text}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.info}>
            <Avatar
              className={classes.avatar}
              alt={props.question.userName || "Foto de perfil"}
              src={props.question.userPicture}
            />
            <Typography className={classes.username}>
              {props.question.userName}
            </Typography>

            <Spacer />
            {isAdmin ? (
              <>
                <CheckCircleOutlineRoundedIcon
                  color="action"
                  className={classes.icon}
                  onClick={handleSolve}
                />
                <ChatBubbleOutlineRoundedIcon
                  color="action"
                  className={classes.icon}
                  onClick={handleSelect}
                />
                <DeleteOutlineRoundedIcon
                  color="action"
                  className={classes.deleteIcon}
                  onClick={handleDelete}
                />
              </>
            ) : (
              <ThumbUpAltOutlinedIcon
                color={isLiked ? "primary" : "action"}
                className={classes.icon}
                onClick={handleLike}
              />
            )}
          </Grid>
        </Grid>
      </Paper>

      <DeleteQuestionModal
        questionId={props.question.id}
        open={deleteModal}
        handleClose={closeDeleteModal}
      />
    </>
  );
}
