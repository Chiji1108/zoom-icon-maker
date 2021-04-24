import { createContext, ReactElement } from "react";

export interface ModalContextProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel: () => void;
  onApply: () => void;
  renderApplyButton: (onApply) => ReactElement;
}

const ModalContext = createContext<ModalContextProps>(null);

export default ModalContext;
