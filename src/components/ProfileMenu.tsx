import {
  Avatar,
  ButtonBase,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import shadows from "@material-ui/core/styles/shadows";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import authStore from "../stores/auth";
import ThemeSwitcher from "./ThemeSwitcher";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "50%",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  menu: {
    boxShadow: shadows[6],
  },
  container: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ProfileMenu() {
  const classes = useStyles();
  const usernames = authStore.user?.displayName?.split(" ");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  let firstChars = "";

  if (usernames) {
    firstChars += usernames[0][0];
    firstChars += usernames[usernames.length - 1][0];
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event: React.MouseEvent<EventTarget>) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  }

  function handleLogout(event: React.MouseEvent<EventTarget>) {
    authStore.signOut();
    handleClose(event);
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div className={classes.container}>
        <Typography>{authStore.user?.displayName || "Usuário"}</Typography>
        <ButtonBase
          ref={anchorRef}
          onClick={handleToggle}
          className={classes.button}
        >
          {authStore.user?.photoURL ? (
            <Avatar
              alt={authStore.user?.displayName || "Foto de perfil"}
              src={authStore.user.photoURL}
            />
          ) : (
            <Avatar>{firstChars}</Avatar>
          )}
        </ButtonBase>
        <ThemeSwitcher />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.menu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default observer(ProfileMenu);
