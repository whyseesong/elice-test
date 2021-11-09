import { ChangeEvent } from "react";
import { TreeType } from "../../types/TreeType";
import useJSZip from "../../hooks/useJSZip";
import useTree from "../../hooks/useTree";
import { saveAs } from "file-saver";
import { JSZipObject } from "jszip";

const FileUploader = () => {
  const zip = useJSZip();
  const { setTree } = useTree();

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      zip.loadAsync(e.target.files[0]).then((data) => {
        setTree(makeTreeArr(data.files));
      });
    }
  };

  const downloadHandler = () => {
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob);
    });
  };

  return (
    <>
      <input type={"file"} onChange={fileHandler} accept={".zip"} />
      <button onClick={downloadHandler}>다운로드</button>
    </>
  );
};

export default FileUploader;

function makeTreeArr(files: Record<string, JSZipObject>): TreeType {
  const tree: TreeType = [];
  for (const dir of Object.keys(files)) {
    const directoryArr: string[] = dir.split("/");
    const type =
      directoryArr[directoryArr.length - 1] === "" ? "folder" : "file";
    const name = directoryArr[directoryArr.length - 1];

    let pointer = tree;
    for (let i = 0; i < directoryArr.length - 1; i++) {
      const name = directoryArr[i];
      let idx = pointer.findIndex((node) => node.name === name);
      if (idx === -1) {
        const dir = directoryArr.slice(i).join("/");
        pointer.push({ type, name, dir, childNode: [] });
        idx = pointer.length - 1;
      }
      pointer = pointer[idx].childNode as TreeType;
    }

    if (type === "file") {
      pointer.push({ type, name, dir });
    }
  }

  return tree;
}
