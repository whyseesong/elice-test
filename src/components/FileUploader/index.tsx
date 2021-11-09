import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import JSZip from "jszip";
import { TreeType } from "../../types/TreeType";

const FileUploader = ({
  setTree,
  setZipData,
  fileDir,
}: {
  setTree: Dispatch<SetStateAction<TreeType>>;
  setZipData: any;
  fileDir: string;
}) => {
  const [data, setData] = useState<Record<string, JSZip.JSZipObject>>();
  useEffect(() => {
    if (!!data && !!fileDir) {
      data[fileDir].async("text").then((data) => {
        setZipData(data);
      });
    }
  }, [fileDir, data, setZipData]);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const zip = new JSZip();
      zip.loadAsync(e.target.files[0]).then((data) => {
        setData(data.files);
        setTree(makeTreeArr(data.files));
      });
    }
  };

  return <input type={"file"} onChange={fileHandler} />;
};

export default FileUploader;

function makeTreeArr(files: any): TreeType {
  const tree: any[] = [];
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
      pointer = pointer[idx].childNode;
    }

    if (type === "file") {
      pointer.push({ type, name, dir });
    }
  }

  return tree;
}
