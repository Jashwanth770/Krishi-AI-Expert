from django.urls import path
from api.views import MarketPriceView, RegisterView, LoginView, WeatherView, UserProfileView
from ai_service.views import ChatView, DetectDiseaseView, RiceQualityView

urlpatterns = [
    path('market-prices/', MarketPriceView.as_view(), name='market-prices'),
    path('ai/analyze-rice/', RiceQualityView.as_view(), name='analyze_rice'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='user-profile'),
]
