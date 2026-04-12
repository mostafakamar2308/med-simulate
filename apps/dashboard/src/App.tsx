// import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Library from "@/pages/mediaLibrary";
import { ApiAuthProvider } from "@/components/providers/apiProvider";
import Home from "@/pages/home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiAuthProvider>
        <RoutesContainer />
      </ApiAuthProvider>
    </QueryClientProvider>
  );
}

const RoutesContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/library" element={<Library />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
