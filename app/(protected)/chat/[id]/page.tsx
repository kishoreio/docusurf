"use client";

import dynamic from "next/dynamic";
import ChatUI from "./chat-ui";

const PdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
});

export default function ChatConv() {
  return (
    <div className="grid grid-col-2">
      <PdfViewer />
      <ChatUI />
    </div>
  );
}
