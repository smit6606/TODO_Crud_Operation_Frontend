import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function PublicRoute() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
