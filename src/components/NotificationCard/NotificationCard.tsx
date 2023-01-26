import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Notification } from "../../context/DefualtProvider";
import useDefaultContext from "../../hooks/useDefualtContext";
import { useEffect } from "react";

export interface notificationCardProps {
  notification: Notification;
}

const NotificationCard = (props: notificationCardProps) => {
  const { state, setState } = useDefaultContext();

  const closeNotification = () => {
    let tempNotifications = state.notifications;

    tempNotifications = tempNotifications.filter(
      (notification) => notification.id !== props.notification.id
    );

    setState({ ...state, notifications: tempNotifications });
  };

  const autoCloseNotification = () => {
    setTimeout(() => {
      closeNotification();
    }, props.notification.timeout);
  };

  useEffect(() => {
    // autoCloseNotification();
  }, []);

  return (
    <div
      onClick={() => closeNotification}
      className={`notification ${state.showLightTheme ? "light" : ""}`}
    >
      <div className="top">
        <div className="icon-con">
          {props.notification.type === "info" && (
            <FontAwesomeIcon className="icon info" icon={faInfoCircle} />
          )}
          {props.notification.type === "error" && (
            <FontAwesomeIcon className="icon error" icon={faXmarkCircle} />
          )}
        </div>
        <p>{props.notification.title}</p>
        <div onClick={() => closeNotification()} className="close">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
      <div className="message">
        <p>{props.notification.message}</p>
      </div>
      <div className="component-con">{props.notification.component}</div>
    </div>
  );
};

export default NotificationCard;
