import { lighten } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";

interface DividerProps {
  title: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: lighten(theme.palette.text.primary, 0.5),
    width: "100%",
    borderBottom: "1px solid",
    borderBottomColor: lighten(theme.palette.text.primary, 0.5),
    lineHeight: "0.1em",
    margin: "32px 0",
  },
  span: {
    background: theme.palette.background.default,
    padding: "0 10px",
  },
}));

export default function Divider({ title }: DividerProps) {
  const classes = useStyles();

  return (
    <Typography align="center" variant="subtitle1" className={classes.root}>
      <span className={classes.span}>{title}</span>
    </Typography>
  );
}
