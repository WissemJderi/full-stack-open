import { useContext } from "react";
import NotifcationContext from "../context/NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotifcationContext);

  if (!notification) return null;

  return (
    <div
      style={{
        backgroundColor: notification.error ? "red" : "green",
        border: "black 3px solid",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <h3>{notification.text}</h3>
    </div>
  );
};

export default Notification;
