import os
from dotenv import load_dotenv
import chromadb
from openai import OpenAI

load_dotenv()


class Embedding:
    def __init__(self):
        self.api_key = os.getenv("Embedding_api_key")
        self.model_name = os.getenv("Embedding_model")
        if not self.api_key or not self.model_name:
            raise ValueError(
                "Model name or API key is not set in the environment variables."
            )
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1", api_key=self.api_key
        )

    def get_embedding(self, chunk: list[str], BATCH_SIZE=10):
        """Accepts text chunks and returns a list of raw float vector embeddings."""
        all_embeddings = []
        # Process the input chunks in batches to avoid API timeout constraints
        for i in range(0, len(chunk), BATCH_SIZE):
            batch = chunk[i : i + BATCH_SIZE]
            # Format inputs: If it is a string, wrap it; if already formatted dict, keep it.
            formatted_input = []
            for item in batch:
                if isinstance(item, str):
                    formatted_input.append(
                        {"content": [{"type": "text", "text": item}]}
                    )
                else:
                    formatted_input.append(item)
            # Send the text batch directly to OpenRouter's embeddings API
            try:
                response = self.client.embeddings.create(
                    model=self.model_name,
                    input=formatted_input,
                    encoding_format="float",
                )
            except Exception as e:
                print("Embedding API failed:")
                print(repr(e))
                raise

            # Extract and store the raw vector lists from the response payload
            all_embeddings.extend([item.embedding for item in response.data])
        return all_embeddings
