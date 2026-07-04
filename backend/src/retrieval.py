from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)
MODEL_NAME = os.getenv("LLM_MODEL")  # "gpt-4o-mini" or "gpt-4o"


def generate_response(question, revelent_chunks):
    context = "\n\n".join(revelent_chunks)
    system_prompt = (
        "You are an assistant for question-answering tasks. Use the following pieces of "
        "retrieved context to answer the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the answer concise."
        "\n\nContext:\n" + context + "\n\nQuestion:\n" + question
    )
    messages = [{"role": "system", "content": system_prompt}]
    user_message = f"Context:\n\n{revelent_chunks}\n\nQuestion: {question}"
    messages.append({"role": "user", "content": user_message})
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME, messages=messages, stream=True
        )
        for chunks in response:
            delta = chunks.choices[0].delta
            if delta and delta.content:
                yield delta.content

    except Exception as e:
        raise RuntimeError(f"Error: {e}") from e
