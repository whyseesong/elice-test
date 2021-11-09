import React, { useEffect, useState } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import useJSZip from "../../hooks/useJSZip";
import useTree from "../../hooks/useTree";

const Editor = () => {
  const zip = useJSZip();
  const { curDir } = useTree();
  const [imageSrc, setImageSrc] = useState<string>("");

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

  // set text/image
  useEffect(() => {
    if (!!curDir) {
      const file = zip.files[curDir];
      if (isImage(curDir)) {
        file.async("blob").then((data) => {
          setImageSrc(URL.createObjectURL(data));
        });
      } else {
        if (!!editorInstance) {
          // 인스턴스가 만들어지고, 초기화가 되기 전에 훅이 돌아서 에러가 남.
          setTimeout(() => {
            file.async("text").then((data) => {
              editorInstance.setValue(data);
            });
          }, 500);
        }
      }
    }

    function isImage(dir: string) {
      return dir.match(/.(jpg|jpeg|png|gif)$/i);
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
      {!!imageSrc && (
        <>
          <button
            onClick={() => {
              setImageSrc("");
            }}
          >
            닫기
          </button>
          <img
            alt={curDir}
            src={imageSrc}
            style={{ width: "500px", height: "500px" }}
          />
        </>
      )}
    </>
  );
};

export default Editor;
