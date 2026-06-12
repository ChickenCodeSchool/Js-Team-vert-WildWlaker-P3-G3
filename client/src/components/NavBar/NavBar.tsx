import Logo from "../../assets/images/logo-wedoo.png";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar">
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
