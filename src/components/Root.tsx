import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      I am Root
      <Outlet />
    </div>
  );
};

export default Root;
