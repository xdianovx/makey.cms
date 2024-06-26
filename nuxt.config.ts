// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  auth: {
    baseURL: "http://45.135.234.37:80/api/v1/admin/",

    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/profile/logout", method: "post" },
        // signUp: { path: '/identity/accounts/register', method: 'post' },
        getSession: { path: "/profile", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/access_token",
      },
      pages: {
        login: "/login",
      },
    },

    globalAppMiddleware: {
      isEnabled: true,
    },
  },
});
