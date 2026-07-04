import json
import os
from src.load_document import load_document
from src.chunking import chunk_text
from src.embedding import Embedding
import hashlib
from src.vectorstore import collection
import pandas as pd


class Document_Ingestor:
    def __init__(self):
        self.metadata = "metadata.json"

    def document_changed(self, path: str):
        if not os.path.exists(self.metadata):
            print("Metadata Does Not Exist. All documents will be added.")
            documentes = load_document(path)
            new_document = [{"add": doc} for doc in documentes]
            return new_document
        else:
            json_data = self.load_metadata()
            documentes = load_document(path)
            new_document = []
            # Map old hashes to their corresponding document ID
            old_id_map = {
                item.get("hash"): item.get("id")
                for item in json_data
                if item.get("hash")
            }
            old_hashes = set(old_id_map.keys())
            new_hashes = set()
            # Identify documents to ADD
            for doc in documentes:
                new_hash = self.get_document_hash(doc["content"])
                new_hashes.add(new_hash)
                if new_hash not in old_hashes:
                    new_document.append({"add": doc})

            # Identify documents to REMOVE (Appends just the ID)
            removed_hashes = old_hashes - new_hashes
            for r_hash in removed_hashes:
                doc_id = old_id_map[r_hash]
                new_document.append({"remove": doc_id})
            # Return results if changes exist
            if new_document:
                print("update found")
                return new_document
            else:
                print("No new documents found.")
                return None

    def load_metadata(self) -> list[dict] | None:
        if not os.path.exists(self.metadata):
            print("Metadata Does Not Exist.")
            return None
        else:
            with open(self.metadata, "r") as f:
                json_data = json.loads(f.read())
            # temporarily recover as pandas trun it JSON string instead of a JSON array.
            if isinstance(json_data, str):
                json_data = json.loads(json_data)

            return json_data

    def get_document_hash(self, document_content: str) -> str:
        return hashlib.sha256(document_content.encode("utf-8")).hexdigest()

    def save_metadata(self, document_id: str, content: str):
        loaded_metadata = self.load_metadata() or []
        loaded_metadata.append(
            {"id": document_id, "hash": self.get_document_hash(content)}
        )
        with open(self.metadata, "w") as f:
            json.dump(loaded_metadata, f, indent=4)

    def add_metadata(self, document_id: str, content: str):
        metadata_list = self.load_metadata()
        if metadata_list is None:
            print("Metadata does not exist. Cannot update.")
            return

        for item in metadata_list:
            if item.get("id") == document_id:
                item["hash"] = self.get_document_hash(content)
                break
        else:
            print(f"Document with ID {document_id} not found in metadata.")
            return

        with open(self.metadata, "w") as f:
            json.dump(metadata_list, f, indent=4)

    def remove_matadata(self, document_id: str):
        df = pd.DataFrame(data=self.load_metadata())
        if document_id is list:
            document_id = set(document_id)

            filtered_df = df[~df["id"].isin(document_id)]
        else:
            # Keeps rows where 'id' does NOT contain 'document_id'
            filtered_df = df[~df["id"].str.contains(document_id, na=False)]

        print(f"id: {document_id}")
        # (~ reverses the boolean mask to keep non-matching rows)
        print(filtered_df)
        with open(self.metadata, "w") as f:
            json.dump(filtered_df.to_dict(orient="records"), f, indent=4)

    def chunk_document(self, document: list[dict]) -> list[dict]:
        """
        Accepts a list of documents and returns a list of chunked documents.
        Each document is represented as a dictionary with 'id' and 'content' keys.
        """
        chunked_documents = []
        document = document if isinstance(document, list) else [document]
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

    def remove_document(self, doc_id: str):
        try:
            collection.delete(
                ids=doc_id,
            )
        except Exception as e:
            raise RuntimeError(
                f"Error occurred while deleting data {doc_id}: {e}"
            ) from e
