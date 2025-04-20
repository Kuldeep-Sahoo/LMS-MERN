// src/layout/TopLoaderLayout.jsx
import TopLoader from "../components/TopLoader";
import { Outlet } from "react-router-dom";

export default function TopLoaderLayout() {
    return (
        <>
            <TopLoader />
            <Outlet />
        </>
    );
}
