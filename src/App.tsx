import React from "react";
import FileUploader from "./components/FileUploader";
import Editor from "./components/Editor";
import FileTree from "./components/FileTree";
import { JsZipContext } from "./context/JsZipContext";
import JSZip from "jszip";
import TreeContainer from "./Containers/TreeContainer";

function App() {
  return (
    <JsZipContext.Provider value={new JSZip()}>
      <TreeContainer>
        <div className="App">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "1rem" }}>
              <FileUploader />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ padding: "1rem" }}>
                <FileTree />
              </div>
              <div style={{ padding: "1rem" }}>
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

/*
 todo:
    스타일드컴포넌트로 스타일 정리

    zip 안에 Zip이 있는 경우 재귀적으로 jsZip인스턴스화
    zip을 여러번 열면 머지되는 현상 수정
 */
