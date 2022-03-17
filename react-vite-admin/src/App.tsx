import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { Navbar, LazyLoad } from './components';
import { useCounter } from './hooks/useCounter';

const About = LazyLoad(() => import('./pages/about'));
const Dashboard = LazyLoad(() => import('./pages/dashboard'));

function App() {
  return (
    <Router>
      <NiceModal.Provider>
        <p>Hello Vite + React!</p>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </NiceModal.Provider>
    </Router>
  );
}

function Layout() {
  return (
    <main>
      <header>
        <Navbar />
      </header>

      <hr />

      <Outlet />
    </main>
  );
}

function Home() {
  const { count, increment } = useCounter();
  return (
    <div>
      <h2>Home</h2>
      <p>
        <button type="button" onClick={increment} className="btn">
          count is: {count}
        </button>
      </p>
    </div>
  );
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
