import Tree from "./Tree";
import useTree from "../../hooks/useTree";
import { MouseEvent } from "react";

const FileTree = () => {
  const { tree, setDir } = useTree();
  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLSpanElement).id === "file") {
      setDir((e.target as HTMLSpanElement).dataset.dir || '');
    }
  };

  return <div onClick={clickHandler}>{<Tree treeArr={tree} />}</div>;
};

export default FileTree;
