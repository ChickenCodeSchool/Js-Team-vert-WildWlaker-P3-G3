import HomeEvents from "./pages/HomeEvents/HomeEvents";
// import { Outlet } from "react-router";
import TableauDeBord from "./pages/TableauDeBord/TableauDeBord";
import "./App.css";
import { Home } from "lucide-react";
import { Outlet } from "react-router";
// import Presentation from "./pages/Presentation/Presentation";

function App() {
  return (
    <>
      <TableauDeBord />
    </>
  );
}

export default App;
