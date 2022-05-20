from django.conf import settings
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)
from  oyren.views import (
register,
get_user_details,
create_class,
list_of_classes,
create_url,
handle_class_request,
get_class_requests,
assing_student_to_class)
from  django.conf.urls.static import static

urlpatterns = [
  path('register/',register),
  path('get_access_token/',TokenObtainPairView.as_view()),
  path('get_refresh_token/',TokenRefreshView.as_view()),
  path('get_user_details/',get_user_details),
  path('create_class/',create_class),
  path('list_of_classes/',list_of_classes),
  path('create_url/',create_url),
  path('handle_class_request/',handle_class_request),
  path('get_class_requests/',get_class_requests),
  path('assign_student_to_class/',assing_student_to_class)

]


