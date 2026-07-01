import "./SideBarAdmin.css";
import { LayoutDashboard, TriangleAlert } from "lucide-react";
interface SideBarProps {
  active: string;
  setActive: (value: string) => void;
}
import Logo from "../../assets/images/logo-wedoo.png";
function SideBarAdmin({ active, setActive }: SideBarProps) {
  return (
    <>
      <nav className="sidebar-admin">
        <div className="logo-sidebar-container">
          <img src={Logo} alt="logo-wedoo" className="logo-sidebar-image" />
          <h2 className="logo-sidebar-h2">
            WE<i>D</i>OO <span className="logo-admin-text"> Admin</span>
          </h2>
        </div>
        <ul className="sidebar-menu">
          <li className={active === "tableau" ? "active" : ""}>
            <button type="button" onClick={() => setActive("tableau")}>
              <LayoutDashboard size={20} className="layout" />
              <span>Tableau de bord</span>
            </button>
          </li>
          <li className={active === "signalement" ? "active" : ""}>
            <button type="button" onClick={() => setActive("signalement")}>
              <TriangleAlert size={20} className="signal" />
              <span>Signalement</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default SideBarAdmin;
