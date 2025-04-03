import { Pinecone, RecordValues } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getFileFromStorage, getUser } from "@/lib/supabase/actions";
import generateId from "@/lib/generateId";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_Key,
  batchSize: 512,
  model: "text-embedding-3-small",
});

async function getPineconeClient() {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
}

async function splitDocIntoChunks(doc) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
    separators: ["\n\n", "\n", " ", ""],
  });

  const chunks = await textSplitter.splitDocuments(doc);

  return chunks;
}

async function createEmbeddings(text) {
  return await embeddings.embedQuery(text);
}

async function storeDocInPinecone(chunks) {
  const user = await getUser();
  if (user?.data?.user?.id) {
    const vectors = [];
    for (const chunk of chunks) {
      const embedding = await createEmbeddings(chunk.pageContent);
      vectors.push({
        id: generateId(),
        values: embedding,
        metadata: {
          text: chunk.pageContent.slice(0, 36000),
          pageNumber: chunk.metadata.loc.pageNumber,
        },
      });
    }
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const index = pc.index("docusurf");
    await index.namespace(user.data.user.id).upsert(vectors);
  }
}

export async function loadDocsIntoPinecone(file) {
  // const file = (await getFileFromStorage()) as Blob;
  if (!file) {
    console.error("File not available");
  }
  const loader = new PDFLoader(file);
  const doc = await loader.load();

  const chunks = await splitDocIntoChunks(doc);

  await storeDocInPinecone(chunks);
}

export async function queryPc(vector: RecordValues) {
  const user = await getUser();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
  const index = pc.index("docusurf");
  const response = await index.namespace(user.data.user.id).query({
    topK: 5,
    vector,
    includeMetadata: true,
  });
  return response;
}

export async function getContext(query: string) {
  const embedding = await createEmbeddings(query);
  const matches = await queryPc(embedding);
  const filter = matches.matches.filter(
    (match) => match.score && match.score > 0.1
  );
  let docs = filter.map((match) => match.metadata.text);
  return docs.join("\n").substring(0, 300);
}
