from http import client

import chromadb
from chromadb.utils import embedding_functions
from src.embedding import Embedding

# initialize the ChromaDB client with a persistent
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection_name = "my_collection"
collection = chroma_client.get_or_create_collection(name=collection_name)


def upsert_document(doc_id: str, chunk: str, embedding: list[float]):
    """
    Upsert a document chunk and its corresponding embedding into the ChromaDB collection.

    Args:
        doc_id (str): The unique identifier for the document chunk.
        chunk (str): The text content of the document chunk.
        embedding (list[float]): The embedding vector corresponding to the document chunk.
    """
    try:
        collection.upsert(ids=[doc_id], documents=[chunk], embeddings=[embedding])
        print(f"Successfully upserted document with ID: {doc_id}")
    except Exception as e:
        print(f"Error occurred while upserting document with ID {doc_id}: {e}")


def query_document(question, n_results=2):
    embedding_function = Embedding()
    embedding = embedding_function.get_embedding(chunk=[question])
    result = collection.query(query_embeddings=embedding, n_results=n_results)
    return result
