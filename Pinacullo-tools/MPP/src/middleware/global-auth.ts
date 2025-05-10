// middleware/global-auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('token')?.value

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})
/*
export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/login', '/register']
  const isAuthenticated = useCookie('token')?.value

  if (!isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
*/