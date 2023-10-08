import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import "./App.css";
import { homeDir } from "@tauri-apps/api/path";

function App() {
  const [inputFolder, setInputFolder] = createSignal("");
  const [outputFolder, setOutputFolder] = createSignal("");

  async function chooseInputFolder() {
    let initialPath = await homeDir();
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: initialPath,
    });
    console.log(selected);
    if (typeof selected === "string") {
      setInputFolder(selected);
    }
  }

  async function chooseOutputFolder() {
    let initialPath = await homeDir();
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: initialPath,
    });
    console.log(selected);
    if (typeof selected === "string") {
      setOutputFolder(selected);
    }
  }

  async function startBackup() {
    const result = await invoke("do_onetime_backup", {
      inputDir: inputFolder(),
      outputDir: outputFolder(),
    });
    console.log(result);
  }

  return (
    <div class="container">
      <div>
        <button onClick={chooseInputFolder}>Choose Input Folder</button>
        <p>{inputFolder()}</p>
      </div>
      <div>
        <button onClick={chooseOutputFolder}>Choose Output Folder</button>
        <p>{outputFolder()}</p>
      </div>
      {inputFolder() && outputFolder() && (
        <button onClick={startBackup}>Backup!</button>
      )}
    </div>
  );
}

export default App;
