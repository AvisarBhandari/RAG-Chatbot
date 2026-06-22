import json
import os
from load_document import load_document
from chunking import chunk_text
from embedding import Embedding
import hashlib
from vectorstore import collection


class Document_Ingestor:
    def __init__(self):
        self.metadata = "metadata.json"

    def document_changed(self) -> bool:
        if not os.path.exists(self.metadata):
            print("Metadata Does Not Exist.")
            return False
        else:
            json_data = self.load_metadata()
            documentes = load_document("data")
            new_hash = set()
            for doc in documentes:
                new_hash.add(self.get_document_hash(doc["content"]))

            old_hash = {item.get("hash") for item in json_data}
            return all(hash in old_hash for hash in new_hash)

    def load_metadata(self) -> list[dict] | None:
        if not os.path.exists(self.metadata):
            print("Metadata Does Not Exist.")
            return None
        else:
            with open(self.metadata, "r") as f:
                json_data = json.load(f)
            return json_data

    def get_document_hash(self, document_content: str) -> str:
        return hashlib.sha256(document_content.encode()).hexdigest()

    def save_metadata(self, metadata: list[dict]):
        loaded_metadata = self.load_metadata() or []
        loaded_metadata.extend(metadata)
        with open(self.metadata, "w") as f:
            json.dump(loaded_metadata, f, indent=4)

    def update_metadata(self, document_id: str, new_hash: str):
        metadata_list = self.load_metadata()
        if metadata_list is None:
            print("Metadata does not exist. Cannot update.")
            return

        for item in metadata_list:
            if item.get("id") == document_id:
                item["hash"] = new_hash
                break
        else:
            print(f"Document with ID {document_id} not found in metadata.")
            return

        with open(self.metadata, "w") as f:
            json.dump(metadata_list, f, indent=4)

    def chunk_document(self, document: list[dict]) -> list[dict]:
        """
        Accepts a list of documents and returns a list of chunked documents.
        Each document is represented as a dictionary with 'id' and 'content' keys.
        """
        chunked_documents = []
        for doc in document:
            doc_id = doc.get("id")
            content = doc.get("content")
            if content:
                chunks = chunk_text(content)
                for i, chunk in enumerate(chunks):
                    chunked_documents.append(
                        {"id": f"{doc_id}_chunk_{i}", "content": chunk}
                    )
        return chunked_documents

    def embed_chunks(self, chunks: list[str]):
        """
        Accept chunks and returns a list of embeddings for each chunk using the Embedding class.

        Args:
            chunks (list[str]): A list of text chunks to be embedded.
        """
        embedding_instance = Embedding()
        return embedding_instance.get_embedding(chunks)

    def upsert_document(self, doc_id: str, chunk: str, embedding: list[float]):
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
