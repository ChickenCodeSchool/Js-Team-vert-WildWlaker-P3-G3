import "./TableauDeBord.css";
import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard.tsx";
import Galerie from "../../components/Galerie/Galerie";
import Messagerie from "../../components/Messagerie/Messagerie";
import SideBar from "../../components/SideBar/SideBar";
import "./TableauDeBord.css";
import Profil from "../../components/Profil/Profil.tsx";
// import Dashboard from "../components/Dashboard";
// import Messagerie from "../components/Messagerie";
// import Reservation from "../components/Reservation";
// import Budget from "../components/Budget";
// import Galerie from "../components/Galerie";

function TableauDeBord() {
  const [active, setActive] = useState("tableau");

  return (
    <>
      <Profil />
      <div className="dashboard-page">
        <SideBar active={active} setActive={setActive} />
        <main className="content">
          {active === "tableau" && <Dashboard />}
          {active === "messagerie" && <Messagerie />}
          {/* {active === "reservation" && <Reservation />}
          {active === "budget" && <Budget />} */}
          {active === "galerie" && <Galerie />}
        </main>
      </div>
    </>
  );
}
export default TableauDeBord;
