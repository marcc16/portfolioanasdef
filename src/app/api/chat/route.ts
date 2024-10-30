import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MongoClient } from "mongodb";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { Message } from "ai";
import { NextResponse } from "next/server";

if (!process.env.MONGODB_ATLAS_URI) {
  throw new Error('Missing MONGODB_ATLAS_URI environment variable');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const client = new MongoClient(process.env.MONGODB_ATLAS_URI);
const namespace = "portfolio.content";
const [dbName, collectionName] = namespace.split(".");
const collection = client.db(dbName).collection(collectionName);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-small",
  configuration: {
    baseURL: "https://api.openai.com/v1",
  }
});

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

export async function POST(req: Request) {
  try {
    console.log("Received request");
    await client.connect();
    console.log("Connected to MongoDB");

    const body = await req.json();
    console.log("Parsed body:", body);
    const messages: Message[] = body.messages;

    const lastMessage = messages[messages.length - 1];

    console.log("Performing similarity search");
    const relevantDocs = await vectorStore.similaritySearch(lastMessage.content, 2);
    console.log("Similarity search results:", relevantDocs);

    const model = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
      configuration: {
        baseURL: "https://api.openai.com/v1",
      }
    });

    const prompt = PromptTemplate.fromTemplate(`
      Eres el representante de Marc, el dueño de esta página web. Responde a las preguntas de los usuarios según el siguiente contexto:

      Contexto: {context}

      Pregunta del usuario: {question}
      Respuesta de Marc: `);

    const chain = RunnableSequence.from([
      {
        context: (input) => input.context,
        question: (input) => input.question,
      },
      prompt,
      model,
    ]);

    console.log("Generating response");
    const response = await chain.invoke({
      question: lastMessage.content,
      context: relevantDocs.map(doc => doc.pageContent).join("\n"),
    });

    console.log("Response generated successfully");
    
    // Extraer el contenido de la respuesta
    const responseContent = response.content || response.text || response.toString();
    
    return NextResponse.json({ response: responseContent });

  } catch (err: unknown) {
    console.error("Error details:", err);
    
    let errorMessage = "Internal server error";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await client.close();
  }
}