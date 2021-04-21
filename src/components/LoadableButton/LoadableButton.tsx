import { Button, ButtonProps } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export interface LoadableButtonProps extends ButtonProps {
  loading: boolean;
  loadingText?: string;
}

export default function LoadableButton({
  loading,
  loadingText = "Loading...",
  children,
  ...props
}: LoadableButtonProps) {
  return (
    <Button
      disabled={loading}
      children={
        loading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            {loadingText}
          </>
        ) : (
          children
        )
      }
      {...props}
    />
  );
}
