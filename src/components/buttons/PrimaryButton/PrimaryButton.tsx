import { ReactNode } from "react";
import "./primary-btn.scss";

// interface

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
  loading?: boolean;
  action?: () => void;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button
      type={`${props.type ? props.type : "button"}`}
      className="btn primary"
      onClick={props.action}
    >
      {props.icon}
      <span>{props.text}</span>
    </button>
  );
};

export default PrimaryButton;
