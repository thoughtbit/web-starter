import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="flex items-center justify-center">
        <li>
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/messages" className="nav-link">
            Messages (Dashboard)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
