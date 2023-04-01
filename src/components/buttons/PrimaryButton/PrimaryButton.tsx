import { ReactNode } from "react";
import "./primary-btn.scss";

// interface

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
  loadingText?: string;
  loading?: boolean;
  action?: () => void;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button
      type={`${props.type ? props.type : "button"}`}
      className="btn primary"
      onClick={props.action}
      disabled={props.loading}
    >
      {props.loading ? "loading" : ""}
      {props.icon}
      <span>{props.loadingText && props.loading ? props.loadingText : props.text}</span>
    </button>
  );
};

export default PrimaryButton;
