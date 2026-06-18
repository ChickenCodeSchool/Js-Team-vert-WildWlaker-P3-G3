import Logo from "../../assets/images/logo-wedoo.png";
import "./NavBar.css";
import { useLocation } from "react-router";
function NavBar() {
  const location = useLocation();
  const navbarDesktop =
    location.pathname.startsWith("/homeevents") ||
    location.pathname.startsWith("/events/");
  return (
    <>
      <nav className={navbarDesktop ? "desktop" : "mobile"}>
        <div className="logo-sidebar-container">
          <img src={Logo} alt="logo-wedoo" className="logo-sidebar-image" />
          <h2 className="logo-sidebar-h2">
            WE<i>D</i>OO
          </h2>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
