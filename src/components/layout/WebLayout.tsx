import { Outlet } from "react-router";

export const WebLayout = () => {
  return (
    <div>
      <div>
        <p>Header</p>
      </div>
      <Outlet />
    </div>
  );
};
