import { useContext } from "react";
import DefualtContext, { Notification } from "../context/DefualtProvider";

const useShowNotificaction = (notification: Notification) => {
  const { state, setState } = useContext(DefualtContext);

  setState({ ...state, notifications: [...state.notifications, notification] });
};

export default useShowNotificaction;
