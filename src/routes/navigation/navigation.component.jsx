import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <Link className="logo_container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav_links_container">
          <Link className="nav_link" to="/shop">
            SHOP
          </Link>
          <Link className="nav_link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
