import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, NavLink, Outlet, Link } from "react-router-dom";
import { LazyLoad } from "@/components";
import Demo3 from "@/pages/demos/demo3";


const Demo1 = LazyLoad(() => import("./pages/demos/demo1"));
const Demo2 = LazyLoad(() => import("./pages/demos/demo2"));
const Demo4 = LazyLoad(() => import("./pages/demos/demo4"));
const Demo5 = LazyLoad(() => import("./pages/demos/demo5"));

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
          <NavLink to="/demo1" className="nav-link">
            Demo1
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo2" className="nav-link">
            Demo2
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo3" className="nav-link">
            Demo3
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo4" className="nav-link">
            Demo4
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo5" className="nav-link">
            Demo5
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/demo2" element={<Demo2 />} />
          <Route path="/demo3" element={<Demo3 />} />
          <Route path="/demo4" element={<Demo4 />} />
          <Route path="/demo5" element={<Demo5 />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  return <div>首页</div>;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
