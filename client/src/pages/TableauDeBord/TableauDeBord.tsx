import "./TableauDeBord.css";
import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard.tsx";
import Galerie from "../../components/Galerie/Galerie";
import Messagerie from "../../components/Messagerie/Messagerie";
import NavBar from "../../components/NavBar/NavBar.tsx";
import SideBar from "../../components/SideBar/SideBar";

import "./TableauDeBord.css";

import Budget from "../../components/Budget/Budget.tsx";
import Profil from "../../components/Profil/Profil.tsx";
import Reservation from "../../components/Reservation/Reservation.tsx";

function TableauDeBord() {
  const [active, setActive] = useState("tableau");

  return (
    <>
      <NavBar />
      <Profil />
      <div className="dashboard-page">
        <SideBar active={active} setActive={setActive} />
        <main className="content">
          {active === "tableau" && <Dashboard />}
          {active === "messagerie" && <Messagerie />}
          {active === "reservation" && <Reservation />}
          {active === "budget" && <Budget />}
          {active === "galerie" && <Galerie />}
        </main>
      </div>
    </>
  );
}
export default TableauDeBord;
