from http import client

import chromadb
from chromadb.utils import embedding_functions
from src.embedding import Embedding

# initialize the ChromaDB client with a persistent
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection_name = "my_collection"
collection = chroma_client.get_or_create_collection(name=collection_name)


def upsert_document(chunk: str, embedding: list[float]):
    """
    Upsert a document chunk and its corresponding embedding into the ChromaDB collection.

    Args:
        chunk (str): The text content of the document chunk.
        embedding (list[float]): The embedding vector corresponding to the document chunk.
    """
    try:
        collection.upsert(
            ids=[chunk["id"]], documents=[chunk["content"]], embeddings=[embedding]
        )
        print("Total items in collection:", collection.count())
        print("Sample item inspection:", collection.peek(limit=1))
    except Exception as e:
        raise RuntimeError(f"Failed to upsert document {chunk['id']}") from e


def query_document(question, n_results=2):
    embedding_function = Embedding()
    embedding = embedding_function.get_embedding(chunk=[question])
    result = collection.query(query_embeddings=embedding, n_results=n_results)
    return result



