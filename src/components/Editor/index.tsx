import React, { useEffect, useState, MouseEvent } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import useJSZip from "../../hooks/useJSZip";
import useTree from "../../hooks/useTree";
import ITextModel = editor.ITextModel;

type TabType = {
  name: string;
  model: ITextModel;
};

const Editor = () => {
  const zip = useJSZip();
  const { curDir } = useTree();
  const [imageSrc, setImageSrc] = useState<string>("");
  const [tabs, setTabs] = useState<TabType[]>([]);

  // init
  const [editorInstance, setEditor] = useState<IStandaloneCodeEditor>();
  useEffect(() => {
    const instance = editor.create(
      document.getElementById("container") as HTMLElement,
      { value: "" }
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
          file.async("text").then((data) => {
            const model = editor.createModel(data);
            editorInstance.setModel(model);
            const name = zip.files[curDir].name;
            setTabs((prev) => [...prev, { name, model }]);
          });
        }
      }
    }

    function isImage(dir: string) {
      return dir.match(/.(jpg|jpeg|png|gif)$/i);
    }
  }, [zip, editorInstance, curDir]);

  const handleSave = () => {
    const value = editorInstance?.getModel()?.getValue();
    // console.log(curDir, value);
    zip.file(curDir, value as string);
    // console.log(zip.files);
  };

  const handleClickTab = (e: MouseEvent<HTMLButtonElement>) => {
    const tab = tabs.find(
      (tab) => tab.model.id === (e.target as HTMLButtonElement).value
    );
    if (!!tab) {
      editorInstance?.setModel(tab.model);
    }
  };

  const handleCloseTab = (e: MouseEvent<HTMLButtonElement>) => {
    const idx = tabs.findIndex(
      (tab) => tab.model.id === (e.target as HTMLButtonElement).value
    );
    if (idx !== -1) {
      // 맨 앞 탭을 닫으면 2번째 탭으로 넘어감.
      const prevIdx = idx === 0 ? 0 : idx - 1;
      tabs.splice(idx, 1);
      const newTabs = tabs.slice();
      setTabs(newTabs);

      // 탭을 다 닫으면 모델을 새로 만듦
      if (newTabs.length === 0) {
        const model = editor.createModel("");
        editorInstance?.setModel(model);
      } else {
        editorInstance?.setModel(newTabs[prevIdx].model);
      }
    }
  };

  return (
    <>
      <button onClick={handleSave}>저장</button>
      {tabs.map((tab) => {
        return (
          <>
            <button
              value={tab.model.id}
              key={`${tab.model.id}_tab`}
              onClick={handleClickTab}
            >
              {tab.name}
            </button>
            <button
              value={tab.model.id}
              key={`${tab.model.id}_x`}
              onClick={handleCloseTab}
            >
              x
            </button>
          </>
        );
      })}
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
