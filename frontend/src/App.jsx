import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useCopyToClipboard } from "usehooks-ts";
import prism from "prismjs";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState(`const add = (a,b) => a+b`);
  const [copiedText, copy] = useCopyToClipboard();
  const [review, setReview] = useState(``);
  useEffect(() => {
    prism.highlightAll();
  }, []);
  const reviewCode = async () => {
    const response = await axios.post("http://localhost:9999/api/ai-review", {
      code,
    });
    setReview(response.data);
  };
  const handleCopy = () => {
    copy(review)
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  return (
    <main className="min-h-lvh w-full bg-amber-200 flex flex-col p-5">
      <div className="title mb-3">
        <h1 className="text-4xl font-bold text-center">CodeTransformer</h1>
        <h3 className="text-center">Clean your JavaScript codes with AI! 🧼</h3>
      </div>
      <div className="wrapper flex flex-col sm:flex-row gap-4">
        <div className="left-up min-h-lvh w-full sm:w-1/2 rounded-xl relative">
          <div className="code-box">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.js, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                background: "black",
                color: "white",
                borderRadius: 14,
              }}
            />
            {/* <pre>
              <code className="language-javascript">{code}</code>
            </pre> */}
          </div>
          <div
            onClick={reviewCode}
            className="code-btn absolute bottom-3 right-5 bg-amber-400 px-3 py-1 rounded cursor-pointer font-bold select-none"
          >
            Review
          </div>
        </div>
        <div className="right-down min-h-lvh w-full sm:w-1/2 bg-gray-600 rounded-xl overflow-auto sm:pl-2 pt-3 relative">
          <Markdown rehypePlugins={rehypeHighlight}>{review}</Markdown>
          <div
            onClick={handleCopy}
            className="code-btn absolute top-3 right-5 bg-amber-400 px-3 py-1 rounded cursor-pointer font-bold select-none"
          >
            📋
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
