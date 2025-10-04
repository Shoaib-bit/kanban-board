import { useAuth } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router";
import { Button } from "../ui/button";

export const WebLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="max-w-[1280xpx] mx-auto">
      <div className="flex justify-between items-center px-12 py-4 border-b">
        <h2 className="text-3xl font-bold">Kanban Board</h2>

        <div className="flex justify-center items-center gap-4">
          <div>
            <p className="font-medium">{user?.username}</p>
            <p className="text-sm">{user?.email}</p>
          </div>
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
