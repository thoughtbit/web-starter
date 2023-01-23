import { useEffect } from 'react';
import { useStore } from 'zustand';
import Settings from './components/Settings';
import { useRoute } from '@/hooks';
import { store } from '@/store';

import styles from './index.module.scss';

function Demos() {
  const { NavLink, Outlet } = useRoute();

  const darkTheme = useStore(store, (s) => s.darkMode);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    darkTheme ? body.classList.add('dark') : body.classList.remove('dark');
  }, [darkTheme]);

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/demos/demo" className="nav-link">
              Demo
            </NavLink>
          </li>
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
      <main>
        <Settings />
        <Outlet />
      </main>
    </>
  );
}

export default Demos;
