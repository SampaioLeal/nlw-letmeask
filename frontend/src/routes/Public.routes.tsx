import { Route } from "react-router-dom";
import Anonymous from "../pages/Anonymous";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Anonymous} />
    </>
  );
}
