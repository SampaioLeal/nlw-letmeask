import { CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: 50,

    width: "100%",
    height: "100%",
    background: theme.palette.primary.main,
    position: "absolute",
    top: 0,

    zIndex: 999999,
  },
}));

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default observer(Loader);
