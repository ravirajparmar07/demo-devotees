import * as React from "react";
import Box from "@mui/material/Box";
import Header from "@/Components/Ui/Profile/Header/index";
import Sidebar from "@/Components/Ui/Profile/Sidebar/Sidebar";
import { Drawer } from "./index";
import { useTheme } from "@mui/material/styles";
import withAuth from "@/hoc/withAuth";

const MiniDrawer = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer variant="permanent" open={open} className="max-md:hidden">
        <Sidebar open={open} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }} className="overflow-hidden">
        <Header
          isSidebarOpen={open}
          theme={theme}
          handleDrawerOpen={handleDrawerOpen}
        />

        <div className="relative bg-[#D4D4D4] overflow-hidden min-h-screen">
          <div className="relative z-10 p-6 max-h-screen overflow-y-auto hide-scrollbar pt-[90px]">
            {children}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default withAuth(MiniDrawer);
