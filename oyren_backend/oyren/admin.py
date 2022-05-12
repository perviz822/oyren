from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from oyren.models import( NewUser,Class,File)
from django.forms import Textarea



class UserAdminConfig(UserAdmin):
    ordering=('email',)
    list_display=('email','name','surname','is_teacher','is_active','is_staff','is_superuser')
    fieldsets=(
        (None,{'fields':('email','name','surname','classes','password')}),
        ('Permissions',{'fields':('is_staff','is_active','is_superuser')}),
        

    )


   
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name','surname','classes' ,'password1', 'password2', 'is_active', 'is_staff','is_superuser')}
         ),
    )

admin.site.register(NewUser,UserAdminConfig)
admin.site.register(Class)
admin.site.register(File)

# Register your models here.
