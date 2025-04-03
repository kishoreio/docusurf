import Link from "next/link";
import {
  Upload,
  MessageSquare,
  Zap,
  Shield,
  ArrowRight,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Command className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">Docusurf AI</span>
          </div>
          <div className="flex gap-3">
            <Link href={routes.login}>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Chat with your PDF documents{" "}
              <span className="text-blue-600">instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Upload any PDF and start asking questions. Our AI will analyze
              your document and provide accurate, contextual answers in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href={routes.login}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Upload PDF
                </Button>
              </Link>
              <Link href={routes.login}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-gray-300"
                >
                  Try Demo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative mx-auto max-w-4xl rounded-xl border bg-white shadow-lg">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-sm font-medium">
                    Financial_Report_2023.pdf
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-4 border-r hidden md:block">
                  <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center"></div>
                </div>
                <div className="md:col-span-2 p-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <span className="text-sm font-semibold">You</span>
                      </div>
                      <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                        <p>
                          What was the company&apos;s revenue growth in 2023?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                        <p>
                          According to the financial report, the company
                          experienced a 15.7% revenue growth in 2023, increasing
                          from $4.2M to $4.86M. This growth was primarily driven
                          by the expansion into new markets and the launch of
                          two new product lines in Q2.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <span className="text-sm font-semibold">You</span>
                      </div>
                      <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                        <p>Can you summarize the key challenges mentioned?</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Ask a question about your document..."
                      className="w-full rounded-lg border px-4 py-2 pr-10"
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Natural Conversations
                </h3>
                <p className="text-gray-600">
                  Chat with your documents using natural language. Ask follow-up
                  questions and get contextual answers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
                <p className="text-gray-600">
                  Our AI processes your documents in seconds, extracting key
                  information and making it immediately accessible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your documents are encrypted and processed securely. We never
                  store your sensitive information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-gray-600">
                  Upload any PDF document to our secure platform.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Process</h3>
                <p className="text-gray-600">
                  Our AI analyzes and indexes your document for quick retrieval.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chat</h3>
                <p className="text-gray-600">
                  Ask questions and get accurate answers based on your document.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to chat with your documents?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of professionals who save hours by using PDFChat to
              extract insights from their documents.
            </p>
            <Link href={routes.login}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
              >
                <Upload className="h-5 w-5" />
                Upload Your First PDF
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Command className="h-5 w-5 text-blue-600" />
              <span className="font-bold">Docusurf AI</span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              © {new Date().getFullYear()} PDFChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
