import { Route } from "react-router-dom";
import Componentes from "../pages/Componentes";
import Anonymous from "../pages/Anonymous";
import RoomPanel from "../pages/RoomPanel";
import Home from "../pages/Home";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Anonymous} />

      {/* Private */}
      <Route path="/home" exact component={Home} />
      <Route path="/sala/:id" exact component={RoomPanel} />

      <Route path="/componentes" exact component={Componentes} />
    </>
  );
}
