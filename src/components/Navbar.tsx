import {
  AppBar,
  Toolbar,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal";
import appStore from "../stores/app";
import authStore from "../stores/auth";
import Logo from "./Logo";
import RoomCodeButton from "./RoomCodeButton";
import Spacer from "./Spacer";
import CloseRoomModal from "./Modals/CloseRoom";

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
  const params = useParams<{ code: string }>();
  const [shutdownModal, openShutdownModal, closeShutdownModal] = useModal();
  const isAdmin = appStore.room?.adminUid === authStore.user?.uid;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Logo height={45} />

            <Spacer />

            <RoomCodeButton code={params.code} />

            {isAdmin && (
              <Button
                className={classes.closeButton}
                variant="outlined"
                color="primary"
                size="small"
                onClick={openShutdownModal}
              >
                Encerrar sala
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <CloseRoomModal open={shutdownModal} handleClose={closeShutdownModal} />
    </div>
  );
}
