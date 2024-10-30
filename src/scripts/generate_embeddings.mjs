import { MongoClient } from "mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

if (!process.env.MONGODB_ATLAS_URI) {
  throw new Error('Missing MONGODB_ATLAS_URI environment variable');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const client = new MongoClient(process.env.MONGODB_ATLAS_URI);
const dbName = "portfolio";
const collectionName = "content";

async function generateEmbeddings() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = await collection.find({ embedding: { $exists: false } }).toArray();
    console.log(`Found ${documents.length} documents without embeddings`);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
      configuration: {
        baseURL: "https://api.openai.com/v1",
      }
    });

    for (const doc of documents) {
      console.log(`Generating embedding for document: ${doc._id}`);
      const embedding = await embeddings.embedQuery(doc.text);

      await collection.updateOne(
        { _id: doc._id },
        { $set: { embedding: embedding } }
      );
      console.log(`Updated document: ${doc._id} with embedding`);
    }

    console.log("Finished generating embeddings");
  } catch (error) {
    console.error("Error generating embeddings:", error);
  } finally {
    await client.close();
  }
}

generateEmbeddings();