import { API_ROUTE } from "~/lib/constants";

export const useApi = async (path: any, options: any = {}) => {
  const { token } = useAuth();

  options.baseURL = API_ROUTE;
  options.headers = {
    ...options.headers,
    Authorization: token.value,
  };

  return await useFetch(path, options);
};
