from django.contrib.auth.models import User
from rest_framework import serializers
from Yatraapp.models import UserProfile, TourPackage, Booking
from .models import ContactMessage,adminUser

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True , write_only=True)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = adminUser
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'