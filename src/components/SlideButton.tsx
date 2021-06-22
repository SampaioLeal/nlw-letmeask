import { lighten } from "@material-ui/core";
import { Paper, Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";

interface SlideButtonProps {
  state: "left" | "right";
  setState: React.Dispatch<React.SetStateAction<"left" | "right">>;
}

interface StylesProps {
  side: "left" | "right";
}

const buttonWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 4,
    position: "relative",
    background: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.grey[400],
  },
  button: {
    width: buttonWidth,
    height: 40,
    color: theme.palette.grey[600],

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  active: (props: StylesProps) => ({
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
    width: buttonWidth,
    height: 40,
    borderRadius: theme.shape.borderRadius,
    position: "absolute",
    top: 4,
    transition: theme.transitions.create(["left", "right"], {
      duration: theme.transitions.duration.standard,
    }),
    left: props.side === "left" ? 4 : buttonWidth + 4,
  }),

  left: (props: StylesProps) => ({
    color: props.side === "left" ? theme.palette.primary.main : undefined,
  }),
  right: (props: StylesProps) => ({
    color: props.side === "right" ? theme.palette.primary.main : undefined,
  }),
}));

export default function SlideButton({ state, setState }: SlideButtonProps) {
  const classes = useStyles({ side: state });

  function handleChange(side: "left" | "right") {
    return () => setState(side);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.active} />

      <Button
        className={clsx(classes.button, classes.left)}
        onClick={handleChange("left")}
        disableRipple
      >
        Criar
      </Button>
      <Button
        className={clsx(classes.button, classes.right)}
        onClick={handleChange("right")}
        disableRipple
      >
        Entrar
      </Button>
    </Paper>
  );
}
