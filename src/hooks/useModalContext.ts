import { useContext } from "react";
import ModalContext from "../components/Modal/ModalContext";

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      `Modal compound components cannot be rendered outside the Modal component`
    );
  }

  return context;
};

export default useModalContext;
