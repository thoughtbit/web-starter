import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from '../routes/routeTree.gen'
import { queryClient } from './react-query'

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  export interface RouteMeta {
    title?: string
    group?: string
  }
}

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
