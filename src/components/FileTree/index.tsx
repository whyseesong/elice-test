import { TreeType } from "../../types/TreeType";
import Tree from "./Tree";

const FileTree = ({
  tree,
  fileSelector,
}: {
  tree: TreeType;
  fileSelector: any;
}) => {
  const clickHandler = (e: any) => {
    if (e.target.id === "file") {
      fileSelector(e.target.dataset.dir);
    }
  };

  return <div onClick={clickHandler}>{<Tree treeArr={tree} />}</div>;
};

export default FileTree;
