import { ReactNode, useEffect } from "react";
import useDefaultContext from "../../../hooks/useDefualtContext";
import { displayProps } from "../Display/Display";
import DisplayRender from "../../DisplayRender/DisplayRender";
import Header from "../../Header/Header";
import MarkdownEditor from "../../MarkdownEditor/MarkdownEditor";
import SideBar from "../../SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./editor-layout.scss";
import NotificationCard from "../../NotificationCard/NotificationCard";
import ModalLayout from "../ModalLayout/ModalLayout";

export interface EditorLayoutProps {
  children?: ReactNode;
}

const EditorLayout = (props: EditorLayoutProps) => {
  const { state, setState, modalState } = useDefaultContext();

  const editors: displayProps[] = [
    {
      title: "markdown",
      component: <MarkdownEditor />,
      showToggler: true,
    },
    {
      title: "preview",
      component: <DisplayRender />,
      showToggler: true,
    },
  ];

  //toggle markdown editor
  const handleToggleEditor = () => {
    setState({ ...state, showEditor: !state.showEditor });
  };

  return (
    <div className={`editor-layout ${state.showLightTheme ? "light" : ""}`}>
      <div className={`sidebar ${state.showSidebar ? "show" : ""}`}>
        <SideBar />
      </div>
      <main
        className={`${state.showLightTheme ? "light" : ""} ${
          !state.showSidebar ? "full" : ""
        }`}
      >
        <Header />
        <div className="flex">
          {editors.map((editor, index) => (
            <div
              className={`display ${editor.title} ${
                state.showEditor ? "" : "hide"
              }`}
              key={index}
            >
              <div className="sub">
                <div className="top">
                  <h5>{editor.title}</h5>
                  {editor.showToggler && (
                    <div className="close">
                      {!state.showEditor && (
                        <FontAwesomeIcon
                          onClick={handleToggleEditor}
                          className="icon"
                          icon={faEye}
                        />
                      )}
                      {state.showEditor && (
                        <FontAwesomeIcon
                          onClick={handleToggleEditor}
                          className="icon"
                          icon={faEyeSlash}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="bottom">{editor.component}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {state.notifications.length > 0 && (
        <div className="notifications-con">
          {state.notifications.map((notification, index) => (
            <NotificationCard notification={notification} key={index} />
          ))}
        </div>
      )}
      {modalState.showModal && <ModalLayout component={modalState.component} />}
    </div>
  );
};

export default EditorLayout;
