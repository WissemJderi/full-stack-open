interface NotificationProps {
  text: string;
}
const Notification = (props: NotificationProps) => {
  if (!props.text) {
    return null;
  }
  return <p style={{ color: "red" }}>{props.text}</p>;
};

export default Notification;
