
import os
from google import genai

API_KEY = "paste here your gemini ai api key here"
client = genai.Client(api_key=API_KEY)

print("Listing supported models (Name Only)...")
try:
    pager = client.models.list()
    for model in pager:
        print(f"Name: {model.name}")
        # Try to guess capability by name
        if 'generateContent' in str(model): 
             print(f"   Matches content gen?")
    
except Exception as e:
    print(f"Error listing models: {e}")

print("\nDone.")
