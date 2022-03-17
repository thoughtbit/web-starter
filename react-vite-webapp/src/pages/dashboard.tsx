import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { api } from '@/services';

export default function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardIndex />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}

function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function DashboardIndex() {
  const { data, error, loading, run } = useRequest(api.getUser, {
    manual: true,
    throttleWait: 1000,
    loadingDelay: 300,
  });

  if (error) return <p> {error?.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard Index</h2>
      <p>
        <button type="button" onClick={run} className="btn">
          run
        </button>
      </p>

      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

function Messages() {
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        <li>Message 1</li>
        <li>Message 2</li>
      </ul>
    </div>
  );
}
