export default defineNuxtRouteMiddleware((to, from) => {
  const jwt = useCookie("auth.token");
  if (jwt.value) {
    return navigateTo("/");
  }
});
