import type { Router } from 'vue-router/auto'

const baseTitle: string = import.meta.env.VITE_APP_TITLE

export function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title
    if (pageTitle)
      document.title = `${pageTitle} | ${baseTitle}`
    else document.title = baseTitle
  })
}
