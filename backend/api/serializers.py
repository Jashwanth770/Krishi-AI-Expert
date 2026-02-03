from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role', 'phone', 'location', 'bio', 'avatar_icon', 'is_verified', 'verification_status', 'user_photo', 'id_proof', 'farm_photo', 'mill_photo']
        read_only_fields = ['is_verified', 'verification_status']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        user = User.objects.create_user(**validated_data)
        # Pass defaults but allow overriding role/phone etc from frontend
        UserProfile.objects.create(user=user, **profile_data)
        return user
