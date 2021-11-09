import React, { useEffect, useState } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import JSZip from "jszip";

const Editor = ({ data, dir }: { data: string; dir: string }) => {
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
    if (!!editorInstance && !!data) {
      // 인스턴스가 만들어지고, 초기화가 되기 전에 훅이 돌아서 에러가 남.
      setTimeout(() => {
        editorInstance.setValue(data);
      }, 500);
    }
  }, [data, editorInstance]);

  const handleSave = () => {
    const value = editorInstance?.getValue();
    const zip = new JSZip();
    zip.file(dir, value as string);
    console.log(value, "!!!");
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
