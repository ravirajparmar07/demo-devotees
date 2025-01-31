import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/Components/Common/Loader/Loader";

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const authToken =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      if (authToken) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          router.push("/");
        }, 500);
      }
    }, [router]);

    if (isLoading) {
      return <Loader isLoading={true} text="Authenticating..." />;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default withAuth;
