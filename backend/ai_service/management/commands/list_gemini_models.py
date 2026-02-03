from django.core.management.base import BaseCommand
from google import genai
import os

class Command(BaseCommand):
    help = 'Lists available Gemini models'

    def handle(self, *args, **options):
        # API Key from views.py (hardcoded for test)
        GEMINI_API_KEY = "paste the gemini ai api key here"
        
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            self.stdout.write("Fetching models...")
            
            # List models
            # According to new SDK docs, it might return an iterator
            for m in client.models.list():
                if "generateContent" in m.supported_generation_methods:
                     self.stdout.write(f"- {m.name}")
                     
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {e}"))
