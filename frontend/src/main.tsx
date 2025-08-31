import { ServerHealthCheck } from "@/components/ServerHealthCheck";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ServerHealthCheck>
          <App />
        </ServerHealthCheck>
      </QueryClientProvider>
    </StrictMode>,
  );
}
