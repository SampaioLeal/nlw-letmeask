import { Route } from "react-router-dom";
import Home from "../pages/Home";

export default function PrivateRoutes() {
  return (
    <>
      <Route path="/" exact component={Home} />
    </>
  );
}
