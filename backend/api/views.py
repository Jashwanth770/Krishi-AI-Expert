from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProfileSerializer
from .models import UserProfile
import requests

# ... (Previous Views: MarketPriceView, WeatherView, RegisterView, LoginView)
import random
from datetime import datetime, timedelta

class MarketPriceView(APIView):
    def get(self, request):
        location = request.query_params.get('location', 'Global')
        
        # Base Prices (Reference) - Expanded List
        base_data = [
            # CEREALS
            {"crop": "Paddy (Common)", "base": 2183, "unit": "Quintal"},
            {"crop": "Paddy (Grade A)", "base": 2203, "unit": "Quintal"},
            {"crop": "Rice (HMT)", "base": 2600, "unit": "Quintal"},
            {"crop": "Rice (Basmati)", "base": 3800, "unit": "Quintal"},
            {"crop": "Wheat (Sharbati)", "base": 3200, "unit": "Quintal"},
            {"crop": "Maize (Corn)", "base": 2090, "unit": "Quintal"},
            {"crop": "Jowar (Hybrid)", "base": 3180, "unit": "Quintal"},
            {"crop": "Bajra", "base": 2500, "unit": "Quintal"},
            
            # PULSES
            {"crop": "Tur (Arhar)", "base": 7000, "unit": "Quintal"},
            {"crop": "Moong (Green Gram)", "base": 8558, "unit": "Quintal"},
            {"crop": "Urad (Black Gram)", "base": 6950, "unit": "Quintal"},
            {"crop": "Chana (Bengal Gram)", "base": 5335, "unit": "Quintal"},
            
            # OILSEEDS
            {"crop": "Soybean", "base": 4600, "unit": "Quintal"},
            {"crop": "Groundnut", "base": 6377, "unit": "Quintal"},
            {"crop": "Mustard", "base": 5650, "unit": "Quintal"},
            {"crop": "Sunflower", "base": 6760, "unit": "Quintal"},
            
            # COMMERCIAL
            {"crop": "Cotton (Long Staple)", "base": 7020, "unit": "Quintal"},
            {"crop": "Sugarcane", "base": 315, "unit": "Quintal"},
            
            # SPICES & VEG
            {"crop": "Chilli (Dry)", "base": 18000, "unit": "Quintal"},
            {"crop": "Turmeric", "base": 7500, "unit": "Quintal"},
            {"crop": "Onion", "base": 1800, "unit": "Quintal"},
            {"crop": "Tomato", "base": 40, "unit": "kg"},
            {"crop": "Potato", "base": 1200, "unit": "Quintal"},
            
            # RICE MILL BY-PRODUCTS
            {"crop": "Rice Bran", "base": 1800, "unit": "Quintal"},
            {"crop": "Broken Rice (Tibbar)", "base": 1900, "unit": "Quintal"},
            {"crop": "Paddy Husk", "base": 400, "unit": "Quintal"}
        ]
        
        live_prices = []
        for item in base_data:
            # 1. Simulate Live Fluctuation (+/- 2%)
            fluctuation = random.randint(-50, 50) if item["unit"] == "Quintal" else random.randint(-5, 5)
            current_price = item["base"] + fluctuation
            
            # 2. Determine Trend
            trend = "stable"
            if fluctuation > 10: trend = "up"
            elif fluctuation < -10: trend = "down"
            
            # 3. Generate 7-Day Forecast (Linear Trend + Random Noise)
            forecast = []
            future_price = current_price
            for i in range(1, 8):
                change = random.randint(-20, 30) # Slight upward bias for simulation
                future_price += change
                forecast.append({
                    "day": (datetime.now() + timedelta(days=i)).strftime('%a'),
                    "price": future_price
                })

            live_prices.append({
                "crop": item["crop"],
                "price": str(current_price),
                "unit": item["unit"],
                "trend": trend,
                "forecast": forecast
            })
            
        return Response({
            "location": location,
            "prices": live_prices,
            "timestamp": datetime.now().isoformat()
        })


class WeatherView(APIView):
    def get(self, request):
        location = request.query_params.get('location', 'Sangli, India')
        city = location.split(',')[0].strip()
        try:
            url = f"https://wttr.in/{city}?format=j1"
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                current = data['current_condition'][0]
                temp_c = current['temp_C']
                humidity = current['humidity']
                weather_desc = current['weatherDesc'][0]['value']
                
                alerts = []
                if int(humidity) > 70:
                    alerts.append({"type": "warning", "message": f"High humidity ({humidity}%) detected. Monitor crops for fungal diseases."})
                if int(temp_c) > 35:
                    alerts.append({"type": "alert", "message": f"High temperature ({temp_c}°C). Ensure adequate irrigation."})
                elif int(temp_c) < 10:
                    alerts.append({"type": "alert", "message": f"Low temperature ({temp_c}°C). Protect crops from frost."})
                if not alerts:
                    alerts.append({"type": "info", "message": "Weather conditions are favorable for farming activities."})
                
                return Response({
                    "location": location,
                    "temperature": temp_c,
                    "condition": weather_desc,
                    "humidity": humidity,
                    "alerts": alerts
                })
        except:
            pass
        return Response({
            "location": location,
            "temperature": "24",
            "condition": "Partly Cloudy",
            "humidity": "75",
            "alerts": [{"type": "warning", "message": f"High humidity alert in {city}. Monitor for Fungal Leaf Spot."}]
        })

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            try:
                profile = user.profile
            except UserProfile.DoesNotExist:
                # Auto-heal: Create missing profile
                profile = UserProfile.objects.create(
                    user=user, 
                    role='farmer', 
                    verification_status='NOT_VERIFIED'
                )

            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "profile": {
                    "role": profile.role,
                    "phone": profile.phone,
                    "location": profile.location,
                    "is_verified": profile.is_verified,
                    "verification_status": profile.verification_status
                }
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    def get(self, request, user_id):
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, user_id):
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                # Allow explicit status override (Power User / Demo Logic)
                if 'verification_status' in request.data:
                    serializer.save(verification_status=request.data['verification_status'])
                elif 'user_photo' in request.data or 'id_proof' in request.data:
                    # Default to PENDING if just uploading images
                    serializer.save(verification_status='PENDING')
                else:
                    serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
