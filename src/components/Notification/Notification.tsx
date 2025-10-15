import {
  Toast,
  ToastTitle,
  ToastBody,
  Link,
} from "@fluentui/react-components";
import "./Notification.css";

const Notification = ({
  showNotification,
  handleClose,
  title,
  body,
}: {
  showNotification: boolean;
  handleClose: () => void;
  title: string;
  body: string;
}) => {
  return (
    <div className="notification-container">
      {showNotification && (
        <Toast>
          <ToastTitle action={<Link onClick={handleClose}>Close</Link>}>{title}</ToastTitle>
          <ToastBody subtitle="">{body}</ToastBody>
        </Toast>
      )}
    </div>
  );
};

export default Notification;
