// src/components/TopLoader.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // default styles
import "../styles/nprogress-custom.css"; // your gradient overrides

NProgress.configure({ showSpinner: false });

const TopLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 400); // delay for smoother effect

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default TopLoader;
