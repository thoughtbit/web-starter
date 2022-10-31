import { useRoute } from "@/hooks";
import styles from "./index.module.scss";


function Demos() {
  const { NavLink, Outlet } = useRoute();
  return (
    <>
      <nav className="navbar">
        <ul className="flex items-center justify-center">
          <li>
            <NavLink to="/demos/demo1" className="nav-link">
              Demo1
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo2" className="nav-link">
              Demo2
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mx-auto max-w-sm">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Demos;
