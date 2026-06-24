from fastapi import FastAPI, Request
from pydantic import BaseModel
from src.embedding import Embedding
from src.chunking import chunk_text
from src.ingest import Document_Ingestor

app = FastAPI()


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


@app.post("/admin/reindex")
def reindex():
    ingest_instance = Document_Ingestor()
    change_docs = ingest_instance.document_changed("../data")
    if change_docs:
        for doc in change_docs:
            if "remove" in doc:
                remove_id = doc["remove"]
                print(f"Removing document with ID: {remove_id}")
                ingest_instance.remove_document(remove_id)
                print(f"Document with ID: {remove_id} removed successfully.")
                ingest_instance.delete_matadata([remove_id])
                print(f"Metadata for document with ID: {remove_id} deleted successfully.")
            if "add" in doc:
                add_doc = doc["add"]
                print(f"Adding document with ID: {add_doc['id']}")
                chunked_docs = ingest_instance.chunk_document(add_doc)
                print(f"Document with ID: {add_doc['id']} chunked into {len(chunked_docs)} chunks.")
                for chunk in chunked_docs:
                    chunk_text = chunk["content"]
                    embedding = ingest_instance.embed_chunks([chunk_text])
                    print(f"Embedding for chunk with ID: {chunk['id']} created successfully.")
                    ingest_instance.upsert_document(chunk["id"], chunk, embedding[0])
                    print(f"Chunk with ID: {chunk['id']} upserted successfully.")
