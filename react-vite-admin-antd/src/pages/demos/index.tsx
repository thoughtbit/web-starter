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
          <li>
            <NavLink to="/demos/demo3" className="nav-link">
              Demo3
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo4" className="nav-link">
              Demo4
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo5" className="nav-link">
              Demo5
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo6" className="nav-link">
              Demo6
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo7" className="nav-link">
              Demo7
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo8" className="nav-link">
              Demo8
            </NavLink>
          </li>
          <li>
            <NavLink to="/demos/demo9" className="nav-link">
              Demo9
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mx-auto max-w-sm">
        <nav>
          <p>页面嵌套</p>
          <ul>
            <li>
              <NavLink
                to="/demos/1b234bk12b3"
                className={({ isActive }) => (isActive ? styles.btnHover : styles.btn)}
              >
                id: 1b234bk12b3
              </NavLink>
            </li>
            <li>
              <NavLink to="/demos/list" className={({ isActive }) => (isActive ? styles.btnHover : styles.btn)}>
                list
              </NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Demos;
