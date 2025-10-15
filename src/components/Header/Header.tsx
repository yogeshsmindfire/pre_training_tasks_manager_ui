import "./Header.css";

import {
  Persona,
  PopoverSurface,
  PopoverTrigger,
  Switch,
  Button,
  Popover,
} from "@fluentui/react-components";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../global/features/themeSlice";
import { logout } from "../../global/features/userSlice";
import { updateTasks } from "../../global/features/tasksSlice";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme, user } = useSelector((state: any) => state);
  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout());
      dispatch(updateTasks(null));
    });
  };
  return (
    <div
      className={`header-container ${theme.isLightTheme ? "light" : "dark"}`}
    >
      <Switch
        onClick={() => dispatch(toggleTheme())}
        checked={theme.isLightTheme ? false : true}
        label={"Dark Theme"}
      ></Switch>
      <p>Tasks Manager</p>
      {user.user && !user.isFetching && (
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Persona name={user.user.name} />
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1}>
            <Button onClick={handleLogout}>Logout</Button>
          </PopoverSurface>
        </Popover>
      )}
    </div>
  );
};

export default Header;
