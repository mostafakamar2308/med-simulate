import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiAuthProvider } from "@/components/providers/api-auth";
import type React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home";
import Protected from "@/components/common/protected";
import SignIn from "@/pages/signIn";
import SignUp from "@/pages/signUp";
import VerifyEmail from "@/pages/verifyEmail";
import NonProtected from "./components/common/nonProtected";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

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
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ApiAuthProvider>
          <RoutesContainer />
        </ApiAuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

const RoutesContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NonProtected />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
