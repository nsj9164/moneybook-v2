import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const localStoragePersister = createAsyncStoragePersister({
  storage: localStorage,
  key: "reactQuery",
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
