from django.conf import settings
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView

)
from  oyren.views import register, get_user_details
from  django.conf.urls.static import static

urlpatterns = [
  path('register/',register),
  path('get_access_token/',TokenObtainPairView.as_view()),
  path('get_refresh_token/',TokenRefreshView.as_view()),
  path('get_user_details/',get_user_details)

]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
