import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import fileIcon from "../../assets/icon-document.svg";
import "./SideBar.scss";
import useDefaultContext from "../../hooks/useDefualtContext";
import { Document } from "../../context/DefualtProvider";
import ModalLayout from "../layouts/ModalLayout/ModalLayout";
import NewDocumentForm from "../forms/NewDocumentModal/NewDocumentForm";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";

const SideBar = () => {
  const { state, setState, modalState, setModalState } = useDefaultContext();

  const handleToggleTheme = () => {
    setState({ ...state, showLightTheme: !state.showLightTheme });
  };

  const handleSetCurrentDocument = (current: Document) => {
    setState({ ...state, currentDocument: current });
  };

  const handleOpenModal = () => {
    setModalState({
      ...modalState,
      showModal: true,
      component: <NewDocumentForm />,
    });
  };

  return (
    <div className="sidebar-sub">
      <div className="top">
        <h4>My documents</h4>
        <PrimaryButton
          text="New Document"
          icon={<FontAwesomeIcon icon={faPlus} />}
          loading={false}
          action={handleOpenModal}
          type="button"
        />

        <nav>
          <ul>
            {state.documents.map((document, index) => (
              <li key={index}>
                <div
                  className="document"
                  onClick={() => handleSetCurrentDocument(document)}
                >
                  <img src={fileIcon} alt="document icon" />
                  <div className="info">
                    <p>{document.createdAt}</p>
                    <h6
                      className={`${
                        document.id === state.currentDocument.id ? "open" : ""
                      }`}
                    >
                      {document.name}.md
                    </h6>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className={`theme-toggler-con ${state.showLightTheme ? "show" : ""}`}
      >
        <FontAwesomeIcon
          icon={faMoon}
          className={`icon ${!state.showLightTheme ? "show" : ""}`}
        />
        <div className="toggler" onClick={handleToggleTheme}></div>
        <FontAwesomeIcon
          icon={faSun}
          className={`icon ${state.showLightTheme ? "show" : ""}`}
        />
      </div>
    </div>
  );
};

export default SideBar;
