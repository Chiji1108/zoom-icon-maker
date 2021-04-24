import { ReactNode, useMemo } from "react";
import ModalContext, { ModalContextProps } from "./ModalContext";
import { Button } from "../Button";

export interface ModalContainerProps extends ModalContextProps {
  children: ReactNode;
}

export default function ModalContainer({
  open,
  title,
  onClose,
  onCancel,
  onApply,
  renderApplyButton = (onApply) => <Button onClick={onApply}>適用</Button>,
  children,
}: ModalContainerProps) {
  //   const value = useMemo(
  //     () => ({
  //       open,
  //       title,
  //       onClose,
  //       onCancel,
  //       onApply,
  //       renderApplyButton,
  //     }),
  //     [open]
  //   );
  const value = {
    open,
    title,
    onClose,
    onCancel,
    onApply,
    renderApplyButton,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
