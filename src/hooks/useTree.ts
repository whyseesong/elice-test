import { useContext } from "react";
import { TreeContext } from "../context/TreeContext";

const useTree = () => {
  const { tree, setTree, curDir, setDir } = useContext(TreeContext);
  if (tree === null || curDir == null) {
    throw new Error("트리컨텍스트 프로바이더 내부에서만 사용할 수 있습니다.");
  }

  return { tree, setTree, curDir, setDir };
};

export default useTree;
