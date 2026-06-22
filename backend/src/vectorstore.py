from http import client

import chromadb
from chromadb.utils import embedding_functions

# initialize the ChromaDB client with a persistent 
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection_name = "my_collection"
collection = chroma_client.get_or_create_collection(name=collection_name)
