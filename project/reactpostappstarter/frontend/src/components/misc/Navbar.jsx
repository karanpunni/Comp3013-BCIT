import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";

import { Button, Box, Switch } from "@mantine/core";

import { useMantineColorScheme } from "@mantine/core";

const Navbar = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };
  return (
    <Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: "40px",
          background: "#f3f3f3",
        }}
      >
        <NavLink to="/">
          <h3 style={{ color: "black" }}>LOGO</h3>
        </NavLink>

        <div
          style={{
            float: "right",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gridColumnGap: "40px",
          }}
        >
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
          
          {!!user && (
            <NavLink to="posts">
              {" "}
              <Button>Posts</Button>
            </NavLink>
          )}

          {!!user && (
            <NavLink to="/posts/create">
              {" "}
              <Button>Create</Button>
            </NavLink>
          )}

          {!!user ? (
            <Button className="logout" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <NavLink to="login">
              <Button>Login</Button>
            </NavLink>
          )}
          <Switch
            size="xl"
            onChange={() => toggleColorScheme()}
            onLabel="Dark"
            offLabel="Light"
          />
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
