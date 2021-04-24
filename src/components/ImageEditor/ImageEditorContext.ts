import { createContext, Dispatch, SetStateAction } from "react";

const ImageEditorContext = createContext<{
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>(null);

export default ImageEditorContext;
