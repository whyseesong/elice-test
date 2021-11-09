import { createContext, Dispatch, SetStateAction } from "react";
import { TreeType } from "../types/TreeType";

type TreeContextValueType = {
  tree: TreeType;
  setTree: Dispatch<SetStateAction<TreeType>>;
  curDir: string;
  setDir: Dispatch<SetStateAction<string>>;
};

export const TreeContext = createContext({} as TreeContextValueType);
