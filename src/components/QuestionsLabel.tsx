import { makeStyles } from "@material-ui/core";

interface QuestionsLabelProps {
  title: string;
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

export default function QuestionsLabel({ title }: QuestionsLabelProps) {
  const classes = useStyles();

  return <div className={classes.root}>{title}</div>;
}
