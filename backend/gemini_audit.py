from google import genai
import os

GENAI_API_KEY ="AIzaSyDO2BCDEEIP-6QR5YTvRKyLTp1BBhR906w"

# Initialize the client
client = genai.Client(api_key=GENAI_API_KEY)

def audit_code(code_snippet: str):
    try:
        prompt = f"""Analyze this Python code and provide feedback as a Senior Engineer would.
        
Code:
{code_snippet}

Provide a brief analysis including:
1. Time Complexity (Big-O notation)
2. Code Style Assessment
3. A fun "RPG-style" badge (e.g., "Python Ninja 🥷", "Code Wizard 🧙", "Clean Coder ✨")

Keep the response concise (2-3 sentences max)."""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "Audit Unavailable"

