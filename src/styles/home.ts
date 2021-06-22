import { darken, makeStyles } from "@material-ui/core";

const useHomeStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  presentation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.main,
    padding: theme.spacing(6),
  },
  title: {
    color: theme.palette.primary.contrastText,
    margin: "16px 0",
  },
  description: {
    color: darken(theme.palette.primary.contrastText, 0.2),
  },
  joinRoom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    padding: theme.spacing(6),
  },
  button: {
    margin: "16px 0",
  },
  input: {
    margin: "16px 0",
  },
  action: {
    margin: "16px 0",
  },
}));

export default useHomeStyles;
