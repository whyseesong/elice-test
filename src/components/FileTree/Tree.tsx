import { TreeType } from "../../types/TreeType";
import File from "./File";
import Folder from "./Folder";

const Tree = ({ treeArr }: { treeArr: TreeType }) => {
  return (
    <>
      {treeArr.map((node) => {
        if (node.type === "folder") {
          return (
            <Folder name={node.name} key={node.dir}>
              <Tree treeArr={node.childNode as TreeType} />
            </Folder>
          );
        } else {
          return <File key={node.dir} name={node.name} dir={node.dir} />;
        }
      })}
    </>
  );
};

export default Tree;
