import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Navbar } from './components';
import { useCounter } from './hooks/useCounter';

const About = lazy(() => import('./pages/about'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  return (
    <Router>
      <p>Hello Vite + React!</p>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<>...</>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <Suspense fallback={<>...</>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
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
