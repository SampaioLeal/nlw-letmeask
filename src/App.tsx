import {
  ThemeProvider,
  CssBaseline,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import lightTheme from "./styles/themes/light";
import "./services/firebase";
import authStore from "./stores/auth";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loader from "./components/Loader";
import appStore from "./stores/app";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Anonymous from "./pages/Anonymous";
import CloseIcon from "@material-ui/icons/Close";

appStore.setLoading(true);

function App() {
  useEffect(() => {
    const unsubscribe = authStore.listenAuthState();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/room/:code" component={Room} />

          {authStore.logged ? (
            <Route path="/" exact component={Home} />
          ) : (
            <Route path="/" exact component={Anonymous} />
          )}
        </Switch>
      </BrowserRouter>

      {appStore.loading && <Loader />}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={!!appStore.notification}
        autoHideDuration={6000}
        onClose={appStore.closeNotification}
        message={appStore.notification}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={appStore.closeNotification}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
}

export default observer(App);
