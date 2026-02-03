from django.urls import path
from .views import DetectDiseaseView, ChatView

urlpatterns = [
    path('detect-disease/', DetectDiseaseView.as_view(), name='detect-disease'),
    path('chat/', ChatView.as_view(), name='chat'),
]
