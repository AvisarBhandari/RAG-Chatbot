import json

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from src.embedding import Embedding
from src.chunking import chunk_text
from src.ingest import Document_Ingestor
from src.vectorstore import upsert_document, query_document
from src.retrieval import generate_response


app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Item(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/embedding")
def create_embedding(item: Item):
    embedding_instance = Embedding()
    chunks = chunk_text(item.text)
    embeddings = embedding_instance.get_embedding(chunks)
    return {"embeddings": embeddings}


@app.post("/admin/query")
def query(item: Item):
    result = query_document(item.text)
    return {"results": result}


@app.post("/admin/reindex")
def reindex():
    ingest_instance = Document_Ingestor()
    change_docs = ingest_instance.document_changed("../data")
    if change_docs:
        for doc in change_docs:
            if "remove" in doc:
                remove_id = doc["remove"]
                print("Removing document")
                ingest_instance.remove_document(remove_id)
                ingest_instance.remove_matadata(remove_id)
                print(f"Document with ID: {remove_id} removed successfully.")
                print(
                    f"Metadata for document with ID: {remove_id} deleted successfully."
                )
            if "add" in doc:
                add_doc = doc["add"]
                print("Adding document")

                chunked_docs = ingest_instance.chunk_document(add_doc)
                print(f"Document chunked into {len(chunked_docs)} chunks.")
                for chunk in chunked_docs:
                    chunk_text = chunk["content"]
                    embedding = ingest_instance.embed_chunks([chunk_text])
                    print("Embedding created successfully.")

                    upsert_document(chunk, embedding[0])

                ingest_instance.save_metadata(add_doc["id"], add_doc["content"])
                print(
                    f"Metadata for document with ID: {add_doc['id']} saved successfully."
                )
        return {"message": "Reindexing completed successfully."}
    else:
        return {"message": "No changes detected in the documents."}


@app.post("/admin/chat")
def chat(question: Item):
    def generate():
        question_text = question.text
        relevant_chunks = query_document(question_text)

        # Send retrieved chunks first
        yield (
            json.dumps({"type": "context", "chunks": relevant_chunks}) + "\n"
        ).encode("utf-8")
        # Stream LLM tokens
        try:
            for chunk in generate_response(question_text, relevant_chunks):
                yield (json.dumps({"type": "token", "content": chunk}) + "\n").encode(
                    "utf-8"
                )
                print(f"Streaming token: {chunk}")  # Debugging statement
        except Exception as e:
            yield (json.dumps({"type": "error", "message": str(e)}) + "\n").encode(
                "utf-8"
            )
            print(f"Error during response generation: {e}")  # Debugging statement

    return StreamingResponse(
        generate(),
        media_type="text/plain",
    )


@app.post("/chat")
def chat_stream(question: Item):
    def generate():
        question_text = question.text
        relevant_chunks = query_document(question_text)

        # Send retrieved chunks first
        yield (
            json.dumps({"type": "context", "ids": relevant_chunks["ids"]}) + "\n"
        ).encode("utf-8")
        # Stream LLM tokens
        try:
            for chunk in generate_response(question_text, relevant_chunks):
                yield (json.dumps({"type": "token", "content": chunk}) + "\n").encode(
                    "utf-8"
                )
                print(f"Streaming token: {chunk}")  # Debugging statement
        except Exception as e:
            yield (json.dumps({"type": "error", "message": str(e)}) + "\n").encode(
                "utf-8"
            )
            print(f"Error during response generation: {e}")  # Debugging statement

    return StreamingResponse(
        generate(),
        media_type="text/plain",
    )
