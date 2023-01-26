import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export interface displayProps {
  component: ReactNode;
  title: string;
  showToggler?: boolean;
}

const Display = (props: displayProps) => {
  return (
    <div>
      <div className="title-bar">
        <h6>{props.title}</h6>
        {props.showToggler && (
          <div className="icon">
            <FontAwesomeIcon icon={faEye} />
            <FontAwesomeIcon icon={faEyeSlash} />
          </div>
        )}
      </div>
      <div className="display-sub">{props.component}</div>
    </div>
  );
};

export default Display;
