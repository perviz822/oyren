import json
from multiprocessing import context
from django.http import HttpResponse, JsonResponse 
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from oyren.serializers import CustomUserSerializer, ClassSerializer,ImageSerializer,Urlserializer,RequestSerializer
from oyren.models import NewUser,Class,Request
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser





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

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_class(request):
    instance=NewUser.objects.get(id=request.user.id)
    serializer=ClassSerializer(data=request.data);
    if serializer.is_valid():
     class_instance=serializer.save();
     instance.classes.add(class_instance);
     data={
         'id':class_instance.id
     }
    return  JsonResponse(data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def list_of_classes(request):
    instance=Class.objects.get(key=request.data['key'])
    data={
        'name':instance.name,
        'id':instance.id
    }
    return JsonResponse(data);


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_url(request):
    serializer=Urlserializer(data=request.data)
    if serializer.is_valid():
        print('serializer is valid')
        instance=serializer.save();
        instance.save();
        return HttpResponse("Url created")    
    else:
        print(serializer.errors)
        return HttpResponse("Something went wrong")   


@api_view(['POST'])  
@permission_classes([permissions.IsAuthenticated])
def handle_class_request(request):
    serializer=RequestSerializer(data=request.data);
    if serializer.is_valid():
        print('serializer is valid')
        instance=serializer.save();
        instance.save();
        data={
            'requested_class':request.data['requested_class'],
            'requesting_student':request.data['requesting_student']
        }
        
        return JsonResponse(data)
    else:
        print('serializer is not valid')    
    return Response(status=500)   

@api_view(['POST'])  
@permission_classes([permissions.IsAuthenticated])
def get_class_requests(request):
    class_instance=Class.objects.all().filter(name=request.data['class_name'])
    instances=Request.objects.all().filter(requested_class=class_instance[0].id)
    serializer=RequestSerializer(instances,many=True,context={'request':request})
    
    return JsonResponse(serializer.data,safe=False)

@api_view(['GET']) 
@permission_classes([permissions.IsAuthenticated])
def assing_student_to_class (request):
    student=NewUser.objects().all().filter(id=request.data['student_id'])
    class_name=Class.objects().all().filter(id=request.data['class_id'])



@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_classes_for_teacher(request):
    instance=NewUser.objects.all().filter(id=request.user.id);
    print(instance)
    class_instances=instance[0].classes.all();
    print(class_instances)
    serializer=ClassSerializer(class_instances,many=True);
    print(serializer.data)
    return JsonResponse(serializer.data,safe=False);



















        









# Create your views here.
