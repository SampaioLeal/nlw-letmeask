import { Route } from "react-router-dom";
import Componentes from "../pages/Componentes";
import Home from "../pages/Home";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/componentes" exact component={Componentes} />
    </>
  );
}
