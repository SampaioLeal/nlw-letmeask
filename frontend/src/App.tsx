import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes.routes";
import lightTheme from "./styles/themes/light";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <PublicRoutes />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
