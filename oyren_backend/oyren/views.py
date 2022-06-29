import json
from multiprocessing import context
from django.http import HttpResponse, JsonResponse 
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from oyren.serializers import CustomUserSerializer, ClassSerializer,ImageSerializer,Urlserializer,RequestSerializer,MyTokenObtainPairSerializer
from oyren.models import NewUser,Class,Request,Url
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)
from django.contrib.auth import user_logged_in
from oyren.models import LoggedInUser







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

@api_view(['POST']) 
@permission_classes([permissions.IsAuthenticated])
def assign_student_to_class(request):
    student_istance=NewUser.objects.all().filter(id=request.data['student_id'])[0]
    class_instance=Class.objects.all().filter(id=request.data['class_id'])[0]
    student_istance.classes.add(class_instance)
    return HttpResponse("request done")
    



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


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_classes_for_student(request):
    instance=NewUser.objects.all().filter(id=request.user.id);
    class_instances=instance[0].classes.all();
    print(class_instances)
    serializer=ClassSerializer(class_instances,many=True);
    print(serializer.data)
    return JsonResponse(serializer.data,safe=False);    


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def delete_request(request):
    request_instance = Request.objects.get(requested_class=request.data['requested_class'],requesting_student=request.data['requesting_student'])
    request_instance.delete()
    return HttpResponse("Request deleted")




@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_urls_of_class(request):
   url_instances=Url.objects.all().filter(class_name=request.data['class_id']);
   serializer=Urlserializer(url_instances,many=True);
   return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_students_list(request):
   class_instance=Class.objects.filter(id=request.data['class_id'])[0]
   print(request.data)
   user_instances=NewUser.objects.filter(classes=class_instance)
   serializer=CustomUserSerializer(user_instances,many=True);
   return JsonResponse(serializer.data,safe=False)


def log_out_student(request):
    print()
    LoggedInUser.objects.delete(id=request.data['user_id'])
    return HttpResponse("User is logged out")





class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class=MyTokenObtainPairSerializer
  
      
    



















        









# Create your views here.
