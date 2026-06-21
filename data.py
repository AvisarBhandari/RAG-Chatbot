import fsspec
from pathlib import Path

data_path = Path("data/")

if not data_path.exists():
    data_path.mkdir(exist_ok=True, parents=True)
    print("Downloading news_articles directory...")
    fs = fsspec.filesystem("github", org="pdichone", repo="rag-intro-chat-with-docs")
    # Download the whole folder recursively
    fs.get("news_articles", str(data_path), recursive=True)
    print("Directory download complete.")
else:
    print("Data already exists, skipping download.")
