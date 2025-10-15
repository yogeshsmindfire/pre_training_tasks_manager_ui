import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@fluentui/react-components";

import { fetchUser, login } from "../../global/features/userSlice";
import { registerUser, verifyUser } from "../../services/authService";

import "./Register.css";

const Register = ({
  handleLogin,
  fetchTasks,
}: {
  handleLogin: () => void;
  fetchTasks: () => void;
}) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state: any) => state.user);

  const verifyEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const email = event.target.value as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      event.target.setCustomValidity("Please enter a valid email address");
    } else {
      const { status } = await verifyUser(email);
      if (status !== 200) {
        event.target.setCustomValidity("Email already in use");
      } else {
        event.target.setCustomValidity("");
      }
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchUser());
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") === "on" ? true : false;
    try {
      const { status, data } = await registerUser(
        name,
        email,
        password,
        remember
      );
      if (status === 200) {
        dispatch(login(data.user));
        fetchTasks();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <form onSubmit={handleRegister}>
          <Input name="name" placeholder="Name" type="text" />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={verifyEmail}
          />
          <Input name="password" placeholder="Password" type="password" />
          <Checkbox label="Remember me" name="remember" />
          {!isFetching && (
            <Button appearance="primary" type="submit">
              Login
            </Button>
          )}
          {isFetching && <Spinner size="small" label="Logging in..." />}
        </form>
        <Link onClick={handleLogin}>Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
