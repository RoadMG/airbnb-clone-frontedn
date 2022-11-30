import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const Root = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Root;
