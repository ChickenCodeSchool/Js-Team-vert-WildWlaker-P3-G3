import "./TableauDeBord.css";
import { useState } from "react";
import Galerie from "../../components/Galerie/Galerie";
import SideBar from "../../components/SideBar/SideBar";

// import Dashboard from "../components/Dashboard";
// import Messagerie from "../components/Messagerie";
// import Reservation from "../components/Reservation";
// import Budget from "../components/Budget";
// import Galerie from "../components/Galerie";

function TableauDeBord() {
  const [active, setActive] = useState("tableau");

  return (
    <>
      <div className="dashboard-page">
        <SideBar active={active} setActive={setActive} />

        <main className="content">
          {/* {active === "tableau" && <Dashboard />} */}
          {/* {active === "messagerie" && <Messagerie />} */}
          {/* {active === "reservation" && <Reservation />} */}
          {/* {active === "budget" && <Budget />} */}
          {active === "galerie" && <Galerie />}
        </main>
      </div>
    </>
  );
}
export default TableauDeBord;
