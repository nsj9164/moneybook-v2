import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  persistQueryClient,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000 }}
  >
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  </PersistQueryClientProvider>
);
