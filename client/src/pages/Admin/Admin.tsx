import "./Admin.css";
import { useState } from "react";
import DashboardAdmin from "../../components/DashboardAdmin/DashboardAdmin";
import NavBar from "../../components/NavBar/NavBar";
import Profil from "../../components/Profil/Profil";
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin";
function Admin() {
  const [active, setActive] = useState("tableau");

  return (
    <>
      <NavBar />
      <Profil />
      <div className="dashboard-page-admin">
        <SideBarAdmin active={active} setActive={setActive} />
        <main className="content">
          {active === "tableau" && <DashboardAdmin />}
          {/* {active === "signalement" && <Signalement />} */}
        </main>
      </div>
    </>
  );
}
export default Admin;
