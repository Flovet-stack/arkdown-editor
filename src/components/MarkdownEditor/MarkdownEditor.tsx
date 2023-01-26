import React from "react";
import useDefaultContext from "../../hooks/useDefualtContext";
import "./markdown-editor.scss";

const MarkdownEditor = () => {
  const { state, setState } = useDefaultContext();

  const TextareaElement =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  //update the current document in the store and subsequently update the documents array in the store
  const handleUpdateState = (content: string) => {
    let tempCurrentDoc = state.currentDocument;
    tempCurrentDoc = { ...tempCurrentDoc, content };
    // console.log(tempCurrentDoc);

    let tempDocs = [...state.documents];

    // eslint-disable-next-line array-callback-return
    tempDocs.map((doc) => {
      if (doc.id === state.currentDocument.id) {
        doc.content = tempCurrentDoc.content;
      }
    });

    setState({
      ...state,
      documents: tempDocs,
      currentDocument: { ...state.currentDocument, content },
    });
  };

  const handleChange = () => {
    handleUpdateState(TextareaElement.current.value);
  };

  return (
    <div className={`markdown-editor ${!state.showSidebar ? "show" : ""}`}>
      <textarea
        name=""
        typeof=""
        onChange={() => handleChange()}
        className={`${state.showLightTheme ? "light" : ""}`}
        value={state.currentDocument.content}
        ref={TextareaElement}
      ></textarea>
    </div>
  );
};

export default MarkdownEditor;
