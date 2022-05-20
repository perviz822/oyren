from dataclasses import Field
import json
from rest_framework import serializers
from oyren.models import NewUser,Class,Images,Url,Request
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=['email','password','name','surname','is_teacher']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model=Class
        fields=['name','key','id']
         

class ImageSerializer(serializers.ModelSerializer)  :
    class Meta:
        model=Images;
        fields=['image']      

class Urlserializer(serializers.ModelSerializer):
    class Meta:
        model=Url;
        fields=['class_name', 'url']

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Request;
        fields=['requested_class','requesting_student']


     


        


    