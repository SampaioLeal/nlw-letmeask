import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoutes from "./routes/Public.routes";
import lightTheme from "./styles/themes/light";
import "./services/firebase";
import authStore from "./stores/auth";
import PrivateRoutes from "./routes/Private.routes";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loader from "./components/Loader";
import appStore from "./stores/app";

appStore.setLoading(true);

function App() {
  useEffect(() => {
    authStore.listenAuthState();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          {authStore.logged && <PrivateRoutes />}

          <PublicRoutes />
        </Switch>
      </BrowserRouter>

      {appStore.loading && <Loader />}
    </ThemeProvider>
  );
}

export default observer(App);
