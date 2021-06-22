import { lighten, makeStyles, Typography } from "@material-ui/core";
import { Paper, Grid, Avatar } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import Spacer from "./Spacer";

interface QuestionProps {
  selected?: boolean;
  done?: boolean;

  onDeleteClick(): void;
}

const useStyles = makeStyles((theme) => ({
  root: (props: QuestionProps) => ({
    padding: theme.spacing(3),
    boxShadow: props.selected ? "0px 2px 12px rgba(0, 0, 0, 0.12)" : undefined,
    borderStyle: props.selected ? "solid" : undefined,
    borderWidth: props.selected ? 1 : undefined,
    borderColor: props.selected ? theme.palette.primary.main : undefined,
    background: props.done
      ? lighten("#000000", 0.8)
      : props.selected
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

  function handleDelete() {
    props.onDeleteClick();
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Olá, eu gostaria de saber como criar um componente funcional dentro
            do React e se existe diferença na perfomance entre um componente com
            classes.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.info}>
          <Avatar className={classes.avatar}>SL</Avatar>
          <Typography className={classes.username}>Sampaio Leal</Typography>

          <Spacer />

          <CheckCircleOutlineRoundedIcon
            color="action"
            className={classes.icon}
          />
          <ChatBubbleOutlineRoundedIcon
            color="action"
            className={classes.icon}
          />
          <DeleteOutlineRoundedIcon
            color="action"
            className={classes.deleteIcon}
            onClick={handleDelete}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
