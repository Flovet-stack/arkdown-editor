import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import { Document, Notification } from "../../../context/DefualtProvider";
import "./new-document-form.scss";
import useDefaultContext from "../../../hooks/useDefualtContext";
import getTodaysDate from "../../../helpers/getTodaysDate";

const NewDocumentForm = () => {
  const { state, setState } = useDefaultContext();
  interface FormValues {
    name: string;
  }

  const addDocumentSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter a name for your document")
      .matches(/^(?!\s+$).*/, "Is not in correct format"),
  });

  // create new document and add to the state
  const CreateNewDocument = (name: string) => {
    const checkDocumentExistence = (documentName: string) =>
      state.documents.some(({ name }) => name === documentName);

    if (!checkDocumentExistence(name)) {
      let newDoc: Document = {
        id: (state.documents.length + 1).toString(),
        name,
        createdAt: getTodaysDate(),
        content: `# Welcome to ${name}`,
      };
      setState({
        ...state,
        documents: [...state.documents, newDoc],
        currentDocument: newDoc,
      });
      // props.closeModal();
    } else {
      const notification: Notification = {
        id: state.notifications.length + 1,
        title: "Duplicate",
        message: "This file you are trying to create already exist",
        type: "error",
        timeout: 3000,
      };

      setState({
        ...state,
        notifications: [...state.notifications, notification],
      });
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        name: "",
      }}
      onSubmit={(values) => {
        CreateNewDocument(values.name);
      }}
      validationSchema={addDocumentSchema}
    >
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <form
          className={`new-document-form  ${
            state.showLightTheme ? "light" : "dark"
          }`}
          onSubmit={handleSubmit}
        >
          <h3>Add a new document</h3>
          <div className="field">
            <input
              type="text"
              name="name"
              placeholder="Document name"
              value={values.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <PrimaryButton
            type="submit"
            text="Create document"
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </form>
      )}
    </Formik>
  );
};

export default NewDocumentForm;
