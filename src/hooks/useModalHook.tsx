import { ReactNode } from "react";
import useDefaultContext from "./useDefualtContext";

export const useOpenModal = (component: ReactNode) => {
  const { modalState, setModalState } = useDefaultContext();

  setModalState({
    ...modalState,
    showModal: true,
    component,
  });
};

export const useCloseModal = () => {
  const { modalState, setModalState } = useDefaultContext();

  setModalState({
    ...modalState,
    showModal: false,
    component: null,
  });
};
