import { ProgressBar } from "@fluentui/react-components";
import "./Loader.css";
import { useSelector } from "react-redux";

const Loader = ({
  value,
}: {
  value: number;
}) => {
  const isLightTheme  = useSelector((state: any) => state.theme.isLightTheme);
  return (
    <div className={`loader-container ${isLightTheme ? "light" : "dark"}`}>
      <ProgressBar value={value} />
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
