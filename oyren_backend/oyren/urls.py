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
assign_student_to_class,
get_classes_for_teacher,
get_classes_for_student,
get_urls_of_class,
delete_request,
get_students_list,
log_out_student,
MyTokenObtainPairView)
from  django.conf.urls.static import static



urlpatterns = [
  path('register/',register),
  path('get_access_token/',MyTokenObtainPairView.as_view()),
  path('get_refresh_token/',TokenRefreshView.as_view()),
  path('get_user_details/',get_user_details),
  path('create_class/',create_class),
  path('list_of_classes/',list_of_classes),
  path('create_url/',create_url),
  path('handle_class_request/',handle_class_request),
  path('get_class_requests/',get_class_requests),
  path('assign_student_to_class/',assign_student_to_class),
  path('delete_request/',delete_request),
  path('get_classes_for_teacher/',get_classes_for_teacher),
  path('get_classes_for_student/',get_classes_for_student),
  path('get_urls_of_class/',get_urls_of_class),
  path('get_students_of_class/',get_students_list),
  path('log_out_user',log_out_student)

]


