import requests


def chat_with_llm(
    prompt: str, model: str = "gemma4", base_url: str = "http://localhost:11434"
) -> str:
    url = f"{base_url}/api/chat"
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
        "think": False,
        "ctx_size": 65000,
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()
    data = response.json()
    return data.get("message", {}).get("content", "")
