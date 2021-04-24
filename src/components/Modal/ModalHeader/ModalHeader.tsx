import { useContext } from "react";
import { MaterialIcon } from "../../MaterialIcon";
import ModalContext from "../ModalContext";

export interface ModalHeaderProps {}

export default function ModalHeader({}: ModalHeaderProps) {
  const { title, onClose } = useContext(ModalContext);
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-900 leading-6">{title}</div>
      <div className="cursor-pointer group p-4" onClick={onClose}>
        <MaterialIcon
          icon="close"
          className="text-2xl text-action group-hover:text-gray-700"
        />
      </div>
    </div>
  );
}
