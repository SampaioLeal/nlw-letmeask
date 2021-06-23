import { makeStyles } from "@material-ui/core";

interface QuestionsLabelProps {
  length: number;
}

const useStyles = makeStyles({
  root: {
    height: 32,
    borderRadius: 16,
    background: "#E559F9",
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    padding: "6px 10px",
    fontWeight: "bold",
    margin: "0 16px",
  },
});

export default function QuestionsLabel({ length }: QuestionsLabelProps) {
  const classes = useStyles();

  let text = "perguntas";

  if (!length) {
    text = "Nadinha";
  } else if (length === 1) {
    text = "pergunta";
  }

  return (
    <div className={classes.root}>
      {length ? length : ""} {text}
    </div>
  );
}
