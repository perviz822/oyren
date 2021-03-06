
from asyncio.windows_events import NULL
from http.cookiejar import FileCookieJar
from pickle import TRUE
from django.db import  models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin, BaseUserManager
from django.conf import settings

def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class Class (models.Model):
    key=models.CharField(max_length=256,unique=True);
    name=models.CharField(max_length=256);
    def __str__(self):
        return self.name;

class File (models.Model): 
    class_name=models.ForeignKey(Class,on_delete=models.CASCADE)
    def __str__(self):
        return self.name;


class CustomUserManager(BaseUserManager,):
        def create_superuser(self,email,name,surname,password,**other_fields):
                other_fields.setdefault('is_staff',True)
                other_fields.setdefault('is_superuser',True)
                other_fields.setdefault('is_active',True)
                if other_fields.get('is_staff') is not True:
                    raise ValueError('super  user must be assigned to is_staff= True')
                if other_fields.get('is_superuser') is not True:
                  raise ValueError('Super user must be assigned to is_super_user=True')
                return self.create_user(email,name,surname, password,**other_fields)   


        def create_user(self,email,name,surname,password,**other_fields):
         if not email:
          raise ValueError(('You must provide an email address'))
         email=self.normalize_email(email); #for example ignore the case sensitivity
         user=self.model(email=email,name=name,surname=surname,**other_fields)
         user.set_password(password)
         user.save()
         return user;

     
class NewUser(AbstractBaseUser,PermissionsMixin):
        email=models.EmailField(max_length=255,unique=True,default=NULL,)
        name=models.CharField(max_length=255)
        surname=models.CharField(max_length=255)
        is_staff=models.BooleanField(default=False)
        is_active=models.BooleanField(default=True) 
        is_teacher=models.BooleanField(default=False)
        classes=models.ManyToManyField(Class)
        objects=CustomUserManager();
        USERNAME_FIELD='email'
        REQUIRED_FIELDS=['name','surname','is_teacher']

        def __str__(self) :
            return self.name


class Request(models.Model):
    requested_class=models.ForeignKey(Class,on_delete=models.CASCADE)
    requesting_student=models.ForeignKey(NewUser,on_delete=models.CASCADE)  

    def __str__(self):
        return self.requesting_student.name


class Images(models.Model):
    image=models.ImageField(upload_to=upload_to) 


class Url(models.Model):
    class_name=models.ForeignKey(Class,on_delete=models.CASCADE)
    url=models.URLField(max_length=3000)    


class LoggedInUser(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,related_name='logged_in_user',on_delete=models.CASCADE)
    session_key=models.CharField(max_length=32,blank=True,null=True)
    def __str__(self):
        return self.user.name
    








    

        



# Create your models here.
