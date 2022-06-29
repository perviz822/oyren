from dataclasses import Field
import json
from rest_framework import serializers
from oyren.models import NewUser,Class,Images,Url,Request
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import user_logged_in

from oyren.models import LoggedInUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=['email','password','name','surname','is_teacher','id']

class ClassSerializer(serializers.ModelSerializer):
    class_id = serializers.SerializerMethodField();
    class Meta:
        model=Class
        fields=['name','key','class_id']
    def get_class_id(self,obj):
        return obj.id;    
         

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Images;
        fields=['image']      

class Urlserializer(serializers.ModelSerializer):
    class Meta:
        model=Url;
        fields=['class_name', 'url']

class RequestSerializer(serializers.ModelSerializer):
    student_name=serializers.SerializerMethodField()
    class Meta:
        model=Request;
        fields=['requested_class','requesting_student','student_name']

    def get_student_name(self,obj):
        student_name=obj.requesting_student.name
        return  student_name;



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(self, user):
        user_logged_in.send(sender=self.__class__,user=user) 
        print('token serializer was run')
        token = super().get_token(user)
        # Add custom claims
        token['name'] = user.name
        # ...
        return token


        


    