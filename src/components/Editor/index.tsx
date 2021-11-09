import React, { useEffect, useState } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import useJSZip from "../../hooks/useJSZip";
import useTree from "../../hooks/useTree";

const Editor = () => {
  const zip = useJSZip();
  const { curDir } = useTree();

  // init
  const [editorInstance, setEditor] = useState<IStandaloneCodeEditor>();
  useEffect(() => {
    const instance = editor.create(
      document.getElementById("container") as HTMLElement,
      {
        value: "",
        language: "javascript",
      }
    );
    setEditor(instance);
  }, []);

  useEffect(() => {
    if (!!editorInstance && !!curDir) {
      // 인스턴스가 만들어지고, 초기화가 되기 전에 훅이 돌아서 에러가 남.
      setTimeout(() => {
        zip.files[curDir].async("text").then((data) => {
          editorInstance.setValue(data);
        });
      }, 500);
    }
  }, [zip, editorInstance, curDir]);

  const handleSave = () => {
    const value = editorInstance?.getValue();
    zip.file(curDir, value as string);
    console.log(zip, "!!!");
  };

  return (
    <>
      <button onClick={handleSave}>저장</button>
      <div
        id={"container"}
        style={{ width: "500px", height: "500px", border: "1px solid #ccc" }}
      />
    </>
  );
};

export default Editor;
