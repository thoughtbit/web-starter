import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Footer from '@/components/Footer'
import NProgress from '@/components/NProgress'

export const Route = createRootRoute({
  component: Layout,
})
function Layout() {
  return (
    <>
      <main className="px-4 py-10 text-center font-sans text-gray-700 dark:text-gray-200">
        <div className="flex justify-center gap-3">
          <Link to="/">Home</Link>
          <Link to="/count">Count</Link>
        </div>
        <Outlet />
        <Footer />
      </main>
      <NProgress />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

export default Layout
