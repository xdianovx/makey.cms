export default defineNuxtRouteMiddleware((to, from) => {
  const jwt = useCookie("auth-token");
  console.log(jwt.value, "middle");
  if (!jwt.value) {
    return navigateTo("/login");
  }
});
