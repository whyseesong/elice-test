import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import Editor from "./components/Editor";
import FileTree from "./components/FileTree";
import { TreeType } from "./types/TreeType";

function App() {
  const [fileTree, setTree] = useState<TreeType>([]);
  const [fileData, setData] = useState(""); // 스트링값
  const [fileDir, setFileDir] = useState(""); // 디렉토리

  return (
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
          <FileUploader
            setTree={setTree}
            setZipData={setData}
            fileDir={fileDir}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "1rem" }}>
            <FileTree tree={fileTree} fileSelector={setFileDir} />
          </div>
          <div style={{ padding: "1rem" }}>
            <Editor data={fileData} dir={fileDir} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/*
 todo:
    저장 구현
    다운로드 구현
    이미지/텍스트 구분 로직 구현
    이미지 뷰어 구현
    탭 구현
    상태관리 로직 구현
 */
