"use client";

import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MIN_SCALE = 0.5;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  function rotateDoc(orientation: "left" | "right") {
    if (orientation === "right") {
      setRotate((prevState) => prevState + 90);
    } else {
      setRotate((prevState) => prevState - 90);
    }
  }

  function zoomDoc(state: "in" | "out") {
    if (state === "in") {
      setScale((prevState) => prevState + 0.5);
    } else {
      setScale((prevState) => prevState - 0.5);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const page = Number(e.target.value);
    if (!isNaN(page)) {
      setPageNumber(page);
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <div className="flex items-center p-2 gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => rotateDoc("left")}
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Rotate Left</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate Left</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => rotateDoc("right")}
            >
              <RotateCw className="h-4 w-4" />
              <span className="sr-only">Rotate Right</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate Right</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1 text-sm mx-2">
          Page{" "}
          <Input
            type="text"
            className="w-12"
            value={pageNumber}
            disabled={Number(numPages) < 2}
            onChange={handleInputChange}
          />{" "}
          of {numPages}
        </div>
        <Separator orientation="vertical" className="h-4" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => zoomDoc("in")}>
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom In</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={MIN_SCALE === scale}
              onClick={() => zoomDoc("out")}
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom Out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
      </div>
      <Document
        file="https://looseleaf-app.s3.us-east-2.amazonaws.com/users/cm6ibmfu9000gks0cy31wa6dw/invoice_19_01_2025-76ac4f2a-122f-4c2b-a6dc-d525a61d2749.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        rotate={rotate}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
    </div>
  );
}
