import { useContext } from "react";
import DefualtContext from "../context/DefualtProvider";

const useDefaultContext = () => {
  return useContext(DefualtContext);
};

export default useDefaultContext;
