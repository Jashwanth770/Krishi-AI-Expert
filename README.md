# Krishi AI: Agricultural Expert Platform 🌾🤖

Krishi AI is an industrial-grade, AI-powered ecosystem designed for farmers, rice millers, and agricultural stakeholders. It combines advanced computer vision, technical diagnostic reporting, and a trusted marketplace to modernize the harvest-to-market lifecycle.

## 🚀 Key Features

### 📊 Industrial Rice Quality Analysis
- **Expert Identification**: Automatically identifies 50+ industrial rice varieties and trade codes (e.g., 1121 Steam, PR-11, MTU-1010, Swarna).
- **Milling Precision**: Detects processing types including **Sortex**, **Silky**, **Sella**, and **Steam** rice.
- **Master Grader Reports**: Generates technical inspection reports covering Broken %, Purity, Chalkiness, and estimated Mandi prices.

### 🩺 Scientific Crop Disease Detector
- **Phytopathology Expertise**: Advanced vision system for identifying diseases, pests, and nutrient deficiencies.
- **Clinical Diagnostics**: Detailed analysis of **Lifecycle Stages** (Early/Late) and **Spread Risk** (Low/Critical).
- **Visual Reasoning**: Explains identifying symptoms (Chlorosis, Necrotic rings) to the user for educational trust.
- **Actionable Plans**: Provides distinct Chemical, Organic, and Crop Management treatment suggestions.

### 🛍️ Trusted Farmer Marketplace
- **Verified Listings**: Products are linked to AI-verified profiles to ensure trade trust.
- **Smart Contact Reveal**: Securely connect with farmers via WhatsApp/Phone only when interest is confirmed.
- **Multi-Role Access**: Dedicated flows for Farmers (selling raw crops), Mills (selling processed rice), and Customers.

### 🤖 Intelligent Farming Assistant
- **Expert Chatbot**: 24/7 support for agricultural queries, from seed selection to government subsidies.
- **Specialized Mill Bot**: A dedicated AI agent for rice millers focused on machinery and industrial output.
- **Multi-Model Fallback**: High-reliability system switching between Gemini-Pro and Flash models to ensure 100% uptime.

### ☁️ Weather & Market Intelligence
- **Real-Time Mandi Prices**: Live tracking of 50+ crops across regional markets.
- **Smart Weather Alerts**: Predictive alerts (e.g., Fungal risk during high humidity) based on local weather data.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Vanilla CSS (Glassmorphism UI)
- **Backend**: Django, Django REST Framework
- **AI Engine**: Google Gemini Vision & LLMs
- **Database**: SQLite (Optimized with "Simple Name" schema)

## 📦 Getting Started

### Prerequisites
- **Python 3.12+** (Required for Django 6.0)
- **Node.js** (Latest LTS)

### Setup Instructions
1. **Backend Setup**:
   ```bash
   # From the project root
   pip install -r requirements.txt
   cd backend
   python manage.py migrate
   python manage.py runserver
   ```
2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔐 Identity & Security
Krishi AI uses a multi-step verification system (`user_photo`, `id_proof`, `farm_photo`) to ensure every seller on the platform is a legitimate stakeholder, reducing fraud in the agricultural supply chain.

---
*Built for the next generation of Indian Farmers.* 🚜🇮🇳
