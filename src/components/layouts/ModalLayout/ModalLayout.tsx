import { ReactNode, useEffect, useState } from "react";
import useDefaultContext from "../../../hooks/useDefualtContext";
import { AnimatePresence, motion } from "framer-motion";
import "./modal-layout.scss";

export interface ModalProps {
  component: ReactNode;
}

const variants = {
  open: { opacity: 1, scale: 1, rotateX: 0, y: 0 },
  closed: { opacity: 0.5, scale: 0.95, rotateX: 90, y: -200 },
};

const ModalLayout = (props: ModalProps) => {
  const { state, modalState, setModalState } = useDefaultContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(true);

    setTimeout(() => {
      setModalState({
        ...modalState,
        component: null,
        showModal: false,
      });
    }, 500);
  };

  const handleKeyPress = (e: any) => {
    var key = e.key;
    if (key === "Escape") {
      setModalState({
        ...modalState,
        component: null,
        showModal: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  return (
    <div className="app-modal">
      <div onClick={handleClose} className="overlay"></div>
      <AnimatePresence>
        <motion.div
          className={`child ${state.showLightTheme ? "light" : "dark"}`}
          initial={isOpen ? variants.open : variants.closed}
          animate={!isOpen ? variants.open : variants.closed}
          transition={{ duration: 0.05 }}
        >
          {props.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModalLayout;
