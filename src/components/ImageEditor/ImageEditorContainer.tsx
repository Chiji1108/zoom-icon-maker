import { ReactNode, useEffect, useMemo, useState } from "react";
import ImageEditorContext from "./ImageEditorContext";

export interface ImageEditorContainerProps {
  children: ReactNode;
  onLoading?: (loading: boolean) => void;
}

export default function ImageEditorContainer({
  children,
  onLoading,
}: ImageEditorContainerProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    onLoading(loading);
  }, [loading]);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);
  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
}
