import { ReactNode } from "react";
import "./grey-button.scss";

// interface

interface GreyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
  loading?: boolean;
  action?: () => void;
}

const GreyButton = (props: GreyButtonProps) => {
  return (
    <button
      type={`${props.type ? props.type : "button"}`}
      className="btn grey"
      onClick={props.action}
    >
      {props.icon}
      <span>{props.text}</span>
    </button>
  );
};

export default GreyButton;
