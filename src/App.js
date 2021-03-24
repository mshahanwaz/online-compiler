import "./App.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-fortran";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import axios from "axios";

function App() {
  const [APIData, setAPIData] = useState({
    clientId: "e463db2adee1eed75d5839b6a3e9430f",
    clientSecret:
      "3ce3725c3a88ecd385ce9efd2048b0c11658072b9e98f9d7b8943ef3f3f247c7",
    versionIndex: "0",
    language: "cpp14",
  });
  const [code, setCode] = useState("c_cpp");

  const languages = [
    {
      title: "C",
      language: "c",
      lcode: "c_cpp",
    },
    {
      title: "C++14",
      language: "cpp14",
      lcode: "c_cpp",
    },
    {
      title: "C++17",
      language: "cpp17",
      lcode: "c_cpp",
    },
    {
      title: "Java",
      language: "java",
      lcode: "java",
    },
    {
      title: "Python 2",
      language: "python2",
      lcode: "python",
    },
    {
      title: "Python 3",
      language: "python3",
      lcode: "python",
    },
    {
      title: "PHP",
      language: "php",
      lcode: "php",
    },
    {
      title: "NodeJS",
      language: "nodejs",
      lcode: "javascript",
    },
    {
      title: "Fortran",
      language: "fortran",
      lcode: "fortran",
    },
    {
      title: "C#",
      language: "csharp",
      lcode: "csharp",
    },
  ];

  const handleProgram = (value) => {
    setAPIData((state) => ({
      ...state,
      script: value,
    }));
  };

  const handleInput = (e) => {
    setAPIData((state) => ({
      ...state,
      stdin: e.target.value,
    }));
  };

  const handleCode = (e) => {
    setAPIData((state) => ({
      ...state,
      language: e.target.value,
    }));
    languages.map((language) => {
      if (language.language === e.target.value) {
        setCode(language.lcode);
        return 1;
      }
    });
  };

  const fetchAPI = async () => {
    const body = JSON.stringify(APIData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      body,
      config
    );
    console.log(res.data);
    var text = document.getElementsByClassName("app__area")[1];
    text.innerHTML = res.data.output;
  };

  const handleRun = () => {
    if (APIData.script) {
      fetchAPI();
    }
  };

  return (
    <div className="app">
      <div className="app__editor">
        <div className="app__editor--title">
          <p>Online Code Editor + Compiler</p>
          <a
            href="https://github.com/mshahanwaz/online-ide"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
        <AceEditor
          placeholder="code here"
          mode={code}
          theme="github"
          ext="beautify"
          name="hello"
          fontSize={16}
          width={600}
          height={400}
          onChange={handleProgram}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
      <div className="app__options">
        <div className="app__languages">
          <p>Languages</p>
          <select onChange={handleCode}>
            {languages.map(({ title, language }, index) => (
              <option key={language} value={language}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <button className="app__run" onClick={handleRun}>
          Run
        </button>
      </div>
      <div className="app__std">
        <textarea
          className="app__area"
          placeholder="stdin"
          onChange={handleInput}
        ></textarea>
        <textarea
          disabled
          className="app__area"
          placeholder="stdout"
        ></textarea>
      </div>
    </div>
  );
}

export default App;
