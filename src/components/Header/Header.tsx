import logo from "../../assets/logo.svg";
import fileIcon from "../../assets/icon-document.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import "./header.scss";
import useDefaultContext from "../../hooks/useDefualtContext";
import { useEffect, useState } from "react";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import { MarkdownService } from "../../services/markdown.service";

const Header = () => {
  const { state, setState, modalState, setModalState } = useDefaultContext();
  const [documentExists, setDocumentExists] = useState(false);
  const [currentDocumentName, setCurrentDocumentName] = useState(
    state.currentDocument.name
  );

  const InputName = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleToggleSidebar = () => {
    setState({ ...state, showSidebar: !state.showSidebar });
  };

  useEffect(() => {
    setCurrentDocumentName(state.currentDocument.name);
  }, [state.currentDocument]);

  //update the current document in the store and subsequently update the documents array in the store
  const handleUpdateState = (name: string) => {
    let tempCurrentDoc = state.currentDocument;
    tempCurrentDoc = { ...tempCurrentDoc, name };

    let tempDocs = [...state.documents];

    // eslint-disable-next-line array-callback-return
    tempDocs.map((doc) => {
      if (doc.id === state.currentDocument.id) {
        doc.name = tempCurrentDoc.name;
      }
    });

    setState({
      ...state,
      documents: tempDocs,
      currentDocument: tempCurrentDoc,
    });
  };

  // reflect changes to the input field
  const handleChange = () => {
    setDocumentExists(false);
    const checkDocumentExistence = (documentName: string) =>
      state.documents.some(({ name }) => name === documentName);

    if (!checkDocumentExistence(InputName.current.value)) {
      handleUpdateState(InputName.current.value);
    } else {
      setDocumentExists(true);
    }
    setCurrentDocumentName(InputName.current.value);
  };

  const handleOpenDeleteModal = () => {
    setModalState({
      ...modalState,
      showModal: true,
      component: <DeleteModal type={"document"} />,
    });
  };

  const handleConverdMarkdown = () => {
    setState({ ...state, isConverting: true });
    // call endpoint to conver string to markdown
    MarkdownService.ConvertMarkdown(state.currentDocument.content).then(
      (response) => {
        setState({
          ...state,
          displayContent: response.data,
          isConverting: false,
        });
      }
    );
  };

  useEffect(() => {
    handleConverdMarkdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleConverdMarkdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentDocument.id]);

  return (
    <header className={`${state.showSidebar ? "" : "full"}`}>
      <div
        onClick={handleToggleSidebar}
        className={`sidebar-toggler ${state.showSidebar ? "show" : ""}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="menu-sub">
        <div className="left">
          <img src={logo} alt="" className="logo" />
          <div className="tab-info">
            <img src={fileIcon} alt="document icon" />
            <div className="info">
              <p>Document Name</p>
              <input
                type="text"
                value={currentDocumentName}
                onChange={() => {
                  handleChange();
                }}
                ref={InputName}
                className={`${documentExists ? "exists" : ""}`}
              />
              {documentExists && (
                <p className="primary">A file with this name already exists</p>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div onClick={handleOpenDeleteModal} className="delete-button">
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <PrimaryButton
            text="Save changes"
            icon={<FontAwesomeIcon icon={faSave} />}
            loading={state.isConverting}
            loadingText="Saving changes"
            action={handleConverdMarkdown}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
