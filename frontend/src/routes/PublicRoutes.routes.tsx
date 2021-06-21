import { Route } from "react-router-dom";
import Componentes from "../pages/Componentes";
import Anonymous from "../pages/Anonymous";
import CreateRoom from "../pages/CreateRoom";
import RoomPanel from "../pages/RoomPanel";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Anonymous} />

      {/* Private */}
      <Route path="/criar-sala" exact component={CreateRoom} />
      <Route path="/administrar-sala/:id" exact component={RoomPanel} />

      <Route path="/componentes" exact component={Componentes} />
    </>
  );
}
