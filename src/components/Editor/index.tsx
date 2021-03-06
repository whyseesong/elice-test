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
          const tab = tabs.find((tab) => tab.name === curDir);
          if (!!tab) {
            editorInstance.setModel(tab.model);
          } else {
            file.async("text").then((data) => {
              const model = editor.createModel(data);
              editorInstance.setModel(model);
              const name = zip.files[curDir].name;
              setTabs((prev) => [...prev, { name, model }]);
            });
          }
        }
      }
    }

    function isImage(dir: string) {
      return dir.match(/.(jpg|jpeg|png|gif)$/i);
    }
  }, [zip, editorInstance, curDir]);

  const handleSave = () => {
    for (const tab of tabs) {
      zip.file(tab.name, tab.model.getValue());
    }
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
      // ??? ??? ?????? ????????? 2?????? ????????? ?????????.
      const prevIdx = idx === 0 ? 0 : idx - 1;
      tabs.splice(idx, 1);
      const newTabs = tabs.slice();
      setTabs(newTabs);

      // ?????? ??? ????????? ????????? ?????? ??????
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
      <button onClick={handleSave}>??????</button>
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
            ??????
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
