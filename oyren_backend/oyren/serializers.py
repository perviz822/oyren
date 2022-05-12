import json
from rest_framework import serializers
from oyren.models import NewUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model=NewUser
        fields=['email','password','name','surname','is_teacher']






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user'] = user
        # ...

        return token        


    