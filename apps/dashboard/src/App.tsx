// import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Library from "@/pages/mediaLibrary";
import { ApiAuthProvider } from "@/components/providers/apiProvider";
import { CasesList } from "@/pages/cases";
import { CaseDetail } from "@/pages/caseDetail";
import { CaseFormPage } from "@/pages/caseFormPage";

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
        <Route path="/" element={<CasesList />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/cases/:id/edit" element={<CaseFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
