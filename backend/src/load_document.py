import os


def load_document(file_path: str) -> list[str]:
    """
    Load the content of a document from the specified file path.

    Args:
        file_path (str): The path to the document file.

    Returns:
        list[str]: A list of document contents, where each item is a string representing the content of a document.
    """
    print(f"Loading document from: {file_path}")
    try:
        document_content = []
        for file_name in os.listdir(file_path):
            if file_name.endswith(".txt"):
                with open(
                    os.path.join(file_path, file_name), "r", encoding="utf-8"
                ) as file:
                    document_content.append({"id": file_name, "content": file.read()})
        return document_content
    except Exception as e:
        print(f"Error occurred while loading document: {e}")
        return []
