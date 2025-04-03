"use client";

import { ChangeEvent, useState, useRef } from "react";
import { Upload, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadDoc } from "@/lib/supabase/actions";

export default function NewChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileClick() {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
    }
  }

  async function handleSubmit() {
    if (file) {
      setIsLoading(true);
      await uploadDoc(file);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Upload PDF</h1>
          <p className="text-sm text-muted-foreground">
            Select or drag and drop your PDF file
          </p>
        </div>
        <div className="grid gap-6">
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer"
            onClick={handleFileClick}
          >
            <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to select or drag and drop PDF
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading || !file}>
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Upload PDF"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
