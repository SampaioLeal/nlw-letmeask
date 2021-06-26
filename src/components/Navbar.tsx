import {
  AppBar,
  Toolbar,
  Button,
  Container,
  makeStyles,
  darken,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal";
import Logo from "./Logo";
import RoomCodeButton from "./RoomCodeButton";
import TwitchIcon from "./TwitchIcon";
import Spacer from "./Spacer";
import CloseRoomModal from "./Modals/CloseRoom";
import ThemeSwitcher from "./ThemeSwitcher";
import roomStore from "../stores/room";
import authStore from "../stores/auth";
import AddTwitchModal from "./Modals/AddTwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid",
    borderBottomColor:
      theme.palette.type === "light"
        ? darken("#fff", 0.2)
        : darken("#fff", 0.8),
    marginBottom: theme.spacing(4),
  },
  closeButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  twitchBtn: {
    marginRight: theme.spacing(1),
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const params = useParams<{ code: string }>();
  const [shutdownModal, openShutdownModal, closeShutdownModal] = useModal();
  const [twitchModal, openTwitchModal, closeTwitchModal] = useModal();
  const isAdmin = roomStore.room?.adminUid === authStore.user?.uid;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Logo height={45} />

            <Spacer />

            {isAdmin && (
              <Button
                className={classes.twitchBtn}
                variant="contained"
                color="primary"
                size="small"
                onClick={openTwitchModal}
              >
                <TwitchIcon />
              </Button>
            )}

            <RoomCodeButton code={params.code} />

            {isAdmin && (
              <Button
                className={classes.closeButton}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={openShutdownModal}
              >
                Encerrar sala
              </Button>
            )}

            <ThemeSwitcher />
          </Toolbar>
        </Container>
      </AppBar>

      <CloseRoomModal open={shutdownModal} handleClose={closeShutdownModal} />
      <AddTwitchModal open={twitchModal} handleClose={closeTwitchModal} />
    </div>
  );
}
