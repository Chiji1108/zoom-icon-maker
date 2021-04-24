import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo, ReactNode, useRef } from "react";
import { MaterialIcon } from "../MaterialIcon";
import { Button } from "../Button";
import { LoadableButton } from "../LoadableButton";

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel: () => void;
  onApply: () => void;
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

const Modal = memo(
  ({
    open,
    title,
    onClose,
    onCancel,
    onApply,
    loading,
    loadingText,
    children,
  }: ModalProps) => {
    const applyButtonRef = useRef();
    return (
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={applyButtonRef}
          static
          open={open}
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md px-6 py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="cursor-pointer group" onClick={onClose}>
                    <MaterialIcon
                      icon="close"
                      className="text-2xl text-action group-hover:text-gray-700"
                    />
                  </div>
                </div>

                <div className="mt-2">{children}</div>

                <div className="mt-4">
                  <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onCancel}>
                      キャンセル
                    </Button>
                    {/* TODO: fix ButtonRef */}
                    <LoadableButton
                      ref={applyButtonRef}
                      loading={loading}
                      loadingText={loadingText}
                      onClick={onApply}
                    >
                      適用
                    </LoadableButton>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
);
Modal.displayName = "Modal";
export default Modal;
