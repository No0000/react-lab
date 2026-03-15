import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App";
import "./index.css";
import CodeBlock from "./components/article/CodeBlock.jsx";

const components = {
  pre: CodeBlock,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MDXProvider components={components}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>
);