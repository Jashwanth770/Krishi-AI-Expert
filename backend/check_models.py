from google import genai
import os

# Use the key we found in views.py
GEMINI_API_KEY = "AIzaSyB-9OnRrTU2hXMH3NO-o6AtUTCNSFtoCd8"
client = genai.Client(api_key=GEMINI_API_KEY)

print("Listing available models...")
try:
    for m in client.models.list():
        if "generateContent" in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error listing models: {e}")
