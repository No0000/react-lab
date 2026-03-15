import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock(props) {
  const { children, ...rest } = props;

  const childArray = React.Children.toArray(children);
  const codeElement = childArray[0];

  if (!React.isValidElement(codeElement)) {
    return <pre {...rest}>{children}</pre>;
  }

  const className = codeElement.props.className || "";
  const match = /language-(\w+)/.exec(className);
  const code = String(codeElement.props.children || "").replace(/\n$/, "");

  if (!match) {
    return <pre {...rest}>{children}</pre>;
  }

  return (
    <SyntaxHighlighter
      style={oneDark}
      language={match[1]}
      PreTag="div"
    >
      {code}
    </SyntaxHighlighter>
  );
}