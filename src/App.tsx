import React from "react";
import FileUploader from "./components/FileUploader";
import Editor from "./components/Editor";
import FileTree from "./components/FileTree";
import { JsZipContext } from "./context/JsZipContext";
import JSZip from "jszip";
import TreeContainer from "./Containers/TreeContainer";
import AppClass from "./App.module.css";

function App() {
  return (
    <JsZipContext.Provider value={new JSZip()}>
      <TreeContainer>
        <div className="App">
          <div className={`${AppClass.Flex} ${AppClass.Center}`}>
            <div className={AppClass.Padding}>
              <FileUploader />
            </div>
            <div className={AppClass.Flex}>
              <div className={AppClass.Padding}>
                <FileTree />
              </div>
              <div className={AppClass.Padding}>
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </TreeContainer>
    </JsZipContext.Provider>
  );
}

export default App;
