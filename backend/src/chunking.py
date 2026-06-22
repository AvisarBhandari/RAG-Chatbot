def chunk_text(text, chunk_size=150, overlap=50):
    """
    Split the input text into chunks of specified size with a certain overlap.

    text: The input text to be chunked.
    chunk_size: The size of each chunk (default is 150 characters).
    overlap: The number of characters to overlap between chunks (default is 50 characters).

    Returns a list of text chunks.
    """
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = min(start + chunk_size, len(words))
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += chunk_size - overlap  # Move the start index for the next chunk
    return chunks