import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import "react-quill/dist/quill.snow.css"; // @ts-ignore
import io, { Socket } from "socket.io-client";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

interface Props {
  roomId: string;
}

function TextEditor() {
  const socketRef = useRef<Socket>();
  // socketRef.current = io(SOCKET_SERVER_URL);

  const [socket, setSocket] = useState<Socket | null>();
  // const [quill, setQuill] = useState<>();
  const [editorValue, setEditorValue] = useState("");
  const quillRef = useRef<ReactQuill>(); // Create a ref for the ReactQuill component

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");
    // const socket = io("http://localhost:3000");
    setSocket(socketRef.current);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    socket?.on("receive-changes", (delta) => {
      // @ts-ignore
      console.log(delta);

      console.log("delta got in client");
      if (quillRef.current) {
        console.log(quillRef.current.getEditor());
        quillRef.current.getEditor().updateContents(delta);
      }

      console.log(quillRef.current!.getEditor());
    });
  }, [quillRef, socket]);

  // useEffect(() => {
  //   console.log("quillRef:", quillRef.current);
  //   console.log("quillRef:", quillRef.current?.getEditor());
  //   console.log("quillRefsa:", quillRef.current?.getEditor());
  // }, [quillRef]);

  // useEffect(() => {
  //   Quill.on("text-change", function (delta, oldDelta, source) {
  //     if (source == "user") {
  //       console.log("A user action triggered this change.");
  //       socket?.emit("send-changes", delta);
  //     }
  //   });
  // }, []);

  function handleTextChange(
    value: string, // @ts-ignore
    delta: DeltaStatic, // @ts-ignore
    source: Sources, // @ts-ignore
    editor: UnprivilegedEditor
  ): void {
    if (source === "user") {
      setEditorValue(value);
      console.log("sfas");
      socket?.emit("send-changes", delta);
    }
  }

  return (
    <ReactQuill // @ts-ignore
      ref={quillRef}
      theme="snow"
      value={editorValue}
      modules={{
        toolbar: TOOLBAR_OPTIONS,
      }}
      onChange={handleTextChange}
    />
  );

  // return <ReactQuill  value={value} onChange={setValue} />;
}

export default TextEditor;
