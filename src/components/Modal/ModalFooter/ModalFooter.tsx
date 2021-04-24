import { ReactElement, useContext } from "react";
import { Button } from "../../Button";
import useModalContext from "../../../hooks/useModalContext";

export interface ModalFooterProps {}

// TODO: この設計は絶対違う
// loadingってもちろんこれが持つものじゃないし、loadableButtonが持つものでもない
// ゆえにカスタムhook

export default function ModalFooter({}: ModalFooterProps) {
  const { onCancel, onApply, renderApplyButton } = useModalContext();
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="secondary" onClick={onCancel}>
        キャンセル
      </Button>
      {renderApplyButton(onApply)}
    </div>
  );
}
