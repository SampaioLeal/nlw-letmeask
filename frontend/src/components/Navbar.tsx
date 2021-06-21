import {
  AppBar,
  Toolbar,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import Logo from "./Logo";
import RoomCodeButton from "./RoomCodeButton";
import Spacer from "./Spacer";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid",
    borderBottomColor: "#E2E2E2",
    marginBottom: theme.spacing(4),
  },
  closeButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Logo height={45} />

            <Spacer />

            <RoomCodeButton />

            <Button
              className={classes.closeButton}
              variant="outlined"
              color="primary"
              size="small"
            >
              Encerrar sala
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
