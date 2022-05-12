import json
from multiprocessing import context
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from oyren.serializers import CustomUserSerializer
from oyren.models import NewUser
from rest_framework import permissions

@api_view(['POST'])
def register(request):
   print(request.data)
   serializer=CustomUserSerializer(data=request.data);
   if serializer.is_valid():
       instance=serializer.save();
       instance.set_password(request.data['password'])
       instance.save();
       print("serializer is valid")
       return HttpResponse("serializer is valid")
   else:
        print('serializer is not valid')
        print(serializer.errors)
        return HttpResponse("serializeris not valid") 

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_details(request):
    data={
        'user':request.user.name ,
        'email':request.user.email,
        'id':request.user.id,
        'is_teacher':request.user.is_teacher
    }
    return  JsonResponse(data)



        









# Create your views here.
