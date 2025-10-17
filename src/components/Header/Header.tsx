import './Header.css';

import {
  Persona,
  PopoverSurface,
  PopoverTrigger,
  Switch,
  Button,
  Popover,
} from '@fluentui/react-components';
import labels from '../../constants/labels';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../global/features/themeSlice';
import { logout } from '../../global/features/userSlice';
import { updateTasks } from '../../global/features/tasksSlice';
import { logoutUser } from '../../services/authService';
import type { RootState } from '../../global/store.types';

const Header = () => {
  const dispatch = useDispatch();
  const { header } = labels;
  const { theme, user } = useSelector((state: RootState) => state);
  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout());
      dispatch(updateTasks(null));
    });
  };
  return (
    <div
      className={`header-container ${theme.isLightTheme ? 'light' : 'dark'}`}
    >
      <Switch
        onClick={() => dispatch(toggleTheme())}
        checked={theme.isLightTheme ? false : true}
        label={header.theme}
      ></Switch>
      <p>{header.title}</p>
      {user.user && !user.isFetching && (
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Persona name={user.user.name} />
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1}>
            <Button onClick={handleLogout}>{header.logout}</Button>
          </PopoverSurface>
        </Popover>
      )}
    </div>
  );
};

export default Header;
