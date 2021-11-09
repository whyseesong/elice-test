import { TreeContext } from "../context/TreeContext";
import { ReactNode, useState } from "react";
import { TreeType } from "../types/TreeType";

const TreeContainer = ({ children }: { children: ReactNode }) => {
  const [tree, setTree] = useState<TreeType>([]);
  const [curDir, setDir] = useState<string>("");

  return (
    <TreeContext.Provider value={{ tree, setTree, curDir, setDir }}>
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContainer;
