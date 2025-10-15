import {
  Button,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { loginUser } from "../../services/authService";
import { login, fetchUser } from "../../global/features/userSlice";

const Login = ({
  handleRegister,
  fetchTasks,
}: {
  handleRegister: () => void;
  fetchTasks: () => void;
}) => {

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state: any) => state.user);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchUser());
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") === "on" ? true : false;
    const { status, data } = await loginUser(email, password, remember);
    if (status === 200) {
      dispatch(login(data.user));
      fetchTasks();
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <form onSubmit={handleLogin}>
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Password" type="password" name="password" />
          <Checkbox label="Remember me" name="remember" />
          {!isFetching && (
            <Button appearance="primary" type="submit">
              Login
            </Button>
          )}
          {isFetching && <Spinner size="small" label="Logging in..." />}
        </form>
        <Link onClick={handleRegister}>New User? Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
