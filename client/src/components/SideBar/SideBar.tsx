import "./SideBar.css";
import {
  BadgeDollarSign,
  Book,
  Images,
  LayoutDashboard,
  MessageCircle,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import Logo from "../../assets/images/logo-wedoo.png";

function SideBar() {
  const [active, setActive] = useState("");

  return (
    <>
      <nav className="sidebar">
        <div className="logo-sidebar-container">
          <img src={Logo} alt="logo-wedoo" className="logo-sidebar-image" />
          <h2 className="logo-sidebar-h2">
            WE<i>D</i>OO
          </h2>
        </div>
        <ul className="sidebar-menu">
          <li className={active === "tableau" ? "active" : ""}>
            <button type="button" onClick={() => setActive("tableau")}>
              <LayoutDashboard size={20} className="layout" />
              <span>Tableau de bord</span>
            </button>
          </li>
          <li className={active === "messagerie" ? "active" : ""}>
            <button type="button" onClick={() => setActive("messagerie")}>
              <MessageCircle size={20} className="message" />
              <span>Messagerie</span>
            </button>
          </li>
          <li className={active === "reservation" ? "active" : ""}>
            <button type="button" onClick={() => setActive("reservation")}>
              <Book size={20} className="book" />
              <span>Reservation</span>
            </button>
          </li>
          <li className={active === "budget" ? "active" : ""}>
            <button type="button" onClick={() => setActive("budget")}>
              <BadgeDollarSign size={20} className="dollar" />
              <span>Budget</span>
            </button>
          </li>
          <li className={active === "galerie" ? "active" : ""}>
            <button type="button" onClick={() => setActive("galerie")}>
              <Images size={20} className="image" />
              <span>Galerie</span>
            </button>
          </li>
        </ul>
        <ul className="sidebar-end-menu">
          <li className="sidebar-signal">
            <button type="button">
              <TriangleAlert size={20} />
              <span>Signaler</span>
            </button>
          </li>
          <li className="sidebar-delete-event">
            <button type="button">
              <Trash2 size={20} />
              <span>Supprimer l'évenement</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
