import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import "./delete-modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPlus } from "@fortawesome/free-solid-svg-icons";
import useDefaultContext from "../../hooks/useDefualtContext";
import GreyButton from "../buttons/GreyButton/GreyButton";

export interface DeleteModalProps {
  type: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { state, setState, modalState, setModalState } = useDefaultContext();
  // const [type, setType] = useState("");

  // delete docuemnt
  const deleteDocument = () => {
    let tempDocs = state.documents;

    tempDocs = tempDocs.filter((doc) => doc.id !== state.currentDocument.id);

    setState({
      ...state,
      documents: tempDocs,
      currentDocument: state.documents[0],
    });
  };

  const handleDelete = () => {
    switch (props.type) {
      case "document":
        // setType("Document");
        deleteDocument();
        setTimeout(() => {
          setModalState({
            ...modalState,
            component: null,
            showModal: false,
          });
        }, 500);
        break;

      default:
        break;
    }
  };

  return (
    <div className={`delete-modal  ${state.showLightTheme ? "light" : "dark"}`}>
      <h3>Delete {props.type}</h3>
      <p>You are about to delete {state.currentDocument.name}.md</p>
      <div className="btns">
        <PrimaryButton
          type="button"
          text={`Delete ${props.type}`}
          icon={<FontAwesomeIcon icon={faPlus} />}
          action={handleDelete}
        />
        <GreyButton
          type="button"
          text="Cancel"
          icon={<FontAwesomeIcon icon={faCancel} />}
          action={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
