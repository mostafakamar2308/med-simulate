import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Protected: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isSignedIn) navigate("/sign-in");
  }, [isSignedIn]);

  return <Outlet />;
};

export default Protected;
